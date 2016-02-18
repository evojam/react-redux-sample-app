import * as React from 'react';
import { Component, MouseEvent, KeyboardEvent, EventHandler } from 'react';

import { ITodo } from '../../todo-lib/dto';
import { todoActions } from '../services/todo-actions';
import { AddItemType } from '../../todo-lib/redux/actions';
import { Maybe, Some, IO } from 'monet';

interface IAddItemProps {
    itemType: string;
}

interface IAddItemRefs {
    [key: string]: HTMLInputElement;
    //'input': HTMLInputElement;
}

export class AddItem extends Component<IAddItemProps, {}> {

    public props: IAddItemProps;
    public refs: IAddItemRefs;

    private get itemTypeText(): string {
        return this.props.itemType.replace(/([a-z])([A-Z])/g, '$1 $2');
    }

    private getInputRef() {
        return Maybe.fromNull(this.refs['input']);
    }

    private isEnterEvent(event: KeyboardEvent) {
        return event.keyCode === 13 || event.which === 13;
    }

    private addItem(input: Maybe<HTMLInputElement>): IO<void> {
        return input.filter(input => Boolean(input.value)).cata(() => new IO(() => {}), input => new IO(() => {
            todoActions.addItem(AddItemType[this.props.itemType], input.value);
            input.value = ''; // FIXME: SideEffect - maybe move to store ?
        }));
    }

    private getClickHandler(): EventHandler<MouseEvent> {
        return (): void => {
            this.addItem(this.getInputRef()).run();
        }
    }

    private getKeyEnterHandler(): EventHandler<KeyboardEvent> {
        return (event: KeyboardEvent): void => {
            this.addItem(Some(event).filter(this.isEnterEvent).flatMap(() => this.getInputRef())).run();
        }
    }

    public render(): JSX.Element {
        return (
            <add-item>
                <input ref="input" type="text" onKeyUp={this.getKeyEnterHandler()} />
                <button onClick={this.getClickHandler()} className="ion">
                    <span>Add {this.itemTypeText}</span>
                </button>
            </add-item>
        );
    }

}
