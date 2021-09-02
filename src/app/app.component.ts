import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
@Injectable()
export class AppComponent implements OnInit {
  title = 'documents-manager-interface';
  fileName = '';
  private static DOCUMENTS_MANAGER_SERVICE_URL = 'http://localhost:4200/api/document/analyze';

  ngOnInit(): void {
  }

  constructor(private http: HttpClient) { }

  onFileSelected(event: any) {

    const file:File = event.target.files[0];

    if (file) {

        this.fileName = file.name;

        const formData = new FormData();

        formData.append("logFile", file, 'logFile');
        const headers = {'responseType': 'blob' as 'json'}
        const upload$ = this.http.post(AppComponent.DOCUMENTS_MANAGER_SERVICE_URL, formData, headers);
        upload$.subscribe(response => this.downLoadFile(response, 'application/octet-stream'));
    }
}

  async fetchDocumentAnalysisManually() {
    try {
      const formData = new FormData()
      const logFile: any = '2010-10-06 09:02:11,550 [WorkerThread-4] INFO  [ServiceProvider]: Executing request getRendering with arguments [1286373729338-5317] on service object { ReflectionServiceObject -> com.dn.gaverzicht.dms.services.DocumentService@4a3a4a3a }\n' +
      '2010-10-06 09:02:13,631 [WorkerThread-2] INFO  [ServiceProvider]: Executing request startRendering with arguments [114466, 0] on service object { ReflectionServiceObject -> com.dn.gaverzicht.dms.services.DocumentService@4a3a4a3a }\n' +
      '2010-10-06 09:02:13,634 [WorkerThread-2] INFO  [ServiceProvider]: Service startRendering returned 1286373733634-5423\n' +
      '2010-10-06 09:02:14,825 [WorkerThread-0] INFO  [ServiceProvider]: Executing request getRendering with arguments [1286373733634-5423] on service object { ReflectionServiceObject -> com.dn.gaverzicht.dms.services.DocumentService@4a3a4a3a }\n' +
      '2010-10-06 09:03:05,869 [WorkerThread-17] INFO  [ServiceProvider]: Executing request startRendering with arguments [114466, 0] on service object { ReflectionServiceObject -> com.dn.gaverzicht.dms.services.DocumentService@4a3a4a3a }\n' +
      '2010-10-06 09:03:05,873 [WorkerThread-17] INFO  [ServiceProvider]: Service startRendering returned 1286373785873-3536\n' +
      '2010-10-06 09:03:06,547 [WorkerThread-15] INFO  [ServiceProvider]: Executing request getRendering with arguments [1286373785873-3536] on service object { ReflectionServiceObject -> com.dn.gaverzicht.dms.services.DocumentService@4a3a4a3a }\n' +
      '2010-10-06 09:03:26,774 [WorkerThread-12] INFO  [ServiceProvider]: Executing request startRendering with arguments [114466, 0] on service object { ReflectionServiceObject -> com.dn.gaverzicht.dms.services.DocumentService@4a3a4a3a }\n' +
      '2010-10-06 09:03:26,777 [WorkerThread-12] INFO  [ServiceProvider]: Service startRendering returned 1286373806777-5552\n' +
      '2010-10-06 09:03:27,985 [WorkerThread-13] INFO  [ServiceProvider]: Executing request getRendering with arguments [1286373806777-5552] on service object { ReflectionServiceObject -> com.dn.gaverzicht.dms.services.DocumentService@4a3a4a3a }\n' +
      '2010-10-06 09:03:57,879 [WorkerThread-14] INFO  [ServiceProvider]: Executing request startRendering with arguments [114273, 0] on service object { ReflectionServiceObject -> com.dn.gaverzicht.dms.services.DocumentService@4a3a4a3a }\n' +
      '2010-10-06 09:03:57,895 [WorkerThread-14] INFO  [ServiceProvider]: Service startRendering returned 1286373837895-7889\n' +
      '2010-10-06 09:03:58,214 [WorkerThread-9] INFO  [ServiceProvider]: Executing request startRendering with arguments [114273, 0] on service object { ReflectionServiceObject -> com.dn.gaverzicht.dms.services.DocumentService@4a3a4a3a }\n' +
      '2010-10-06 09:03:58,218 [WorkerThread-9] INFO  [ServiceProvider]: Service startRendering returned 1286373837895-7889\n' +
      '2010-10-06 09:03:59,790 [WorkerThread-14] INFO  [ServiceProvider]: Executing request getRendering with arguments [1286373837895-7889] on service object { ReflectionServiceObject -> com.dn.gaverzicht.dms.services.DocumentService@4a3a4a3a }\n' +
      '2010-10-06 09:04:01,287 [WorkerThread-3] INFO  [ServiceProvider]: Executing request startRendering with arguments [114273, 1] on service object { ReflectionServiceObject -> com.dn.gaverzicht.dms.services.DocumentService@4a3a4a3a }\n' +
      '2010-10-06 09:04:01,290 [WorkerThread-3] INFO  [ServiceProvider]: Service startRendering returned 1286373841290-1204';
      const byteNumbers = new Array(logFile.length);
      for (let i = 0; i < logFile.length; i++) {
        byteNumbers[i] = logFile.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], {type: 'application/octet-stream'});
      formData.append('logFile', blob, 'logFile')
      const headers = {'responseType': 'blob' as 'json'}
      await this.http.post<Blob>(AppComponent.DOCUMENTS_MANAGER_SERVICE_URL, formData, headers).subscribe(response => this.downLoadFile(response, 'application/octet-stream'));
    } catch (error) {
      console.error(`Error occurred: ${error}`);
    }
  }

  downLoadFile(data: any, type: string) {
    let blob = new Blob([data], { type: type});
    let url = window.URL.createObjectURL(blob);
    var anchor = document.createElement("a");
    anchor.download = "analyzed_document.json";
    anchor.href = url;
    anchor.click();
  }

}
