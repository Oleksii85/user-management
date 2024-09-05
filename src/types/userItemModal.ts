import { User } from "./userTypes";

export interface UserItemModalProps {
  user: User;
  onClose: () => void;
}
