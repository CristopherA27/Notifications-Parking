import { Observable } from "rxjs";
export interface Empty {
}

export interface NotificationRequest {
  name: string;
  email: string;
  qrCode: string;
  checkoutUrl: string;
  dateHourStart: string;
  zoneName: string;
  patente: string;
}
export interface NotificationResponse {
  success: boolean;
  message: string;
}
export interface EmailsServiceClient {
  sendEmailInformation(request: NotificationRequest): Observable<NotificationResponse>;
}