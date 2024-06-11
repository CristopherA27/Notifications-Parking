import { Observable } from "rxjs";
export interface Empty {
}

export interface NotificationRequest {
  name: string;
  email: string;
  amount: number;
  status: string;
  timeDuration: number;
}
export interface NotificationResponse {
  success: boolean;
  message: string;
}
export interface EmailsServiceClient {
  sendEmailInformation(request: NotificationRequest): Observable<NotificationResponse>;
}