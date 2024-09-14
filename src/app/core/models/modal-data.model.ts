import { ModalMode } from "../services/enum.service";

export class ModalData {
    open: boolean = false;
    mode: ModalMode | undefined;
    data: any = {};
}