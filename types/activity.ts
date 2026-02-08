export interface Activity {
  id: string;
  userId: string;
  action: ActivityAction;
  resourceType?: "product" | "purchase" | "contact" | "user" | "settings";
  resourceId?: string | number;
  description: string;
  metadata?: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
  createdAt: Date;
}

export type ActivityAction =
  | "login"
  | "logout"
  | "register"
  | "purchase"
  | "product_view"
  | "product_create"
  | "product_update"
  | "product_delete"
  | "contact_create"
  | "contact_update"
  | "profile_update"
  | "password_change"
  | "settings_update"
  | "email_verify"
  | "password_reset";

export interface ActivityFilter {
  userId?: string;
  action?: ActivityAction;
  resourceType?: string;
  startDate?: Date;
  endDate?: Date;
}
