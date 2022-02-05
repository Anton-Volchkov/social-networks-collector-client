export * from './channels.service';
import { ChannelsService } from './channels.service';
export * from './messages.service';
import { MessagesService } from './messages.service';
export * from './users.service';
import { UsersService } from './users.service';
export * from './verificationCode.service';
import { VerificationCodeService } from './verificationCode.service';
export const APIS = [ChannelsService, MessagesService, UsersService, VerificationCodeService];
