import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

const API_KEY = "bc68ff8a6f3e8c34ff947136b3b882ac";

export class ApiInterceptop implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const NEW_URL = req.url + `&api_key=${API_KEY}`;
        const NEW_REQ = req.clone({
            url: NEW_URL
        });
        return next.handle(NEW_REQ);
    }

}