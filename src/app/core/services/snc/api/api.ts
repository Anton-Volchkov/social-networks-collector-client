export * from './messages.service';
import { MessagesService } from './messages.service';
export * from './subscriptions.service';
import { SubscriptionsService } from './subscriptions.service';
export * from './subscriptionsGroup.service';
import { SubscriptionsGroupService } from './subscriptionsGroup.service';
export * from './users.service';
import { UsersService } from './users.service';
export * from './verificationCode.service';
import { VerificationCodeService } from './verificationCode.service';
export const APIS = [MessagesService, SubscriptionsService, SubscriptionsGroupService, UsersService, VerificationCodeService];
