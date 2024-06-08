import { Component, OnInit } from '@angular/core';
import { ApiRestManagerService } from '../shared/services/api-rest-manager.service';
import { ToastrService } from 'ngx-toastr';
import { Document } from '../shared/models/document.model';
import { MatDialog } from '@angular/material/dialog';
import { UploadFileDialogComponent } from '../shared/components/upload-file-dialog/upload-file-dialog.component';
import { ConfirmationDialogComponent } from '../shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
  selectedFile!: File;
  documents: Document[] = [];

  constructor(private apiManager: ApiRestManagerService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getDocuments();
  }


  onFileUpload() {
    this.dialog.open(UploadFileDialogComponent).afterClosed().subscribe({
      next: () => this.getDocuments()
    });
  }

  getDocuments() {
    this.apiManager.readDocumentsOfUser().subscribe({
      next: (documents) => {
        this.documents = documents.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      },
      error: (error) => {
        this.toastr.error('No se ha podido obtener los documentos', 'Error', {
          timeOut: 3000,
          positionClass: 'toast-bottom-right',
        });
      }
    });
  }

  private handleDocumentResponse(response: any, documentName?: string) {
    if (response.body !== null) {
      const blob = new Blob([response.body], { type: response.body.type });
      const url = window.URL.createObjectURL(blob);

      if (documentName) {
        const link = document.createElement('a');
        link.href = url;
        link.download = documentName;
        link.click();
        window.URL.revokeObjectURL(url);
      } else {
        window.open(url);
      }
    } else {
      this.toastr.error('No se ha podido descargar el documento', 'Error', {
        timeOut: 3000,
        positionClass: 'toast-bottom-right',
      });
    }
  }

  onSeeDocument(documentId: string) {
    this.apiManager.readDocument(documentId).subscribe({
      next: (response) => this.handleDocumentResponse(response),
      error: (error) => {
        this.toastr.error('No se puede ver el documento', 'Error', {
          timeOut: 3000,
          positionClass: 'toast-bottom-right',
        });
      }
    });
  }

  onDownloadDocument(documentId: string, documentName: string) {
    this.apiManager.readDocument(documentId).subscribe({
      next: (response) => this.handleDocumentResponse(response, documentName),
      error: (error) => {
        this.toastr.error('No se ha podido descargar el documento', 'Error', {
          timeOut: 3000,
          positionClass: 'toast-bottom-right',
        });
      }
    });
  }

  onDeleteDocument(documentId: string) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { title: 'Borrar documento', message: '¿Estás seguro de que deseas eliminar este documento?' }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.apiManager.deleteDocument(documentId).subscribe({
          next: (response) => {
            this.getDocuments();
            this.toastr.success('Documento eliminado correctamente', 'Documento', {
              timeOut: 3000,
              positionClass: 'toast-bottom-right',
            });
          },
          error: (error) => {
            this.toastr.error('No se ha podido eliminar el documento', 'Error', {
              timeOut: 3000,
              positionClass: 'toast-bottom-right',
            });
          }
        });
      }
    });

  }

  onDeleteDocuments() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { title: 'Borrar todos los documentos', message: '¿Estás seguro de que deseas eliminar todos los documentos?' }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.apiManager.deleteDocumentsOfUser().subscribe({
          next: (response) => {
            this.getDocuments();
            this.toastr.success('Documentos eliminados correctamente', 'Documentos', {
              timeOut: 3000,
              positionClass: 'toast-bottom-right',
            });
          },
          error: (error) => {
            this.toastr.error('No se ha podido eliminar los documentos', 'Error', {
              timeOut: 3000,
              positionClass: 'toast-bottom-right',
            });
          }
        });
      }
    });
  }
}
