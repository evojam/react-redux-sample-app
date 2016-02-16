import { IAppAction, ActionType } from './action';

export class ItemStateAction implements IAppAction {
    constructor(
        public id: string,
        public type: ActionType
    ) {}
}
