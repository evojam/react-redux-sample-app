import * as React from 'react';
import { Component, MouseEvent, KeyboardEvent, EventHandler } from 'react';

import { ITodo } from '../../todo-lib/dto';
import { todoActions } from '../services/todo-actions';
import { AddItemType } from '../../todo-lib/redux/actions';
import { Maybe, Some, IO } from 'monet';

interface IAddItemProps {
    itemType: string;
}

export class AddItem extends Component<IAddItemProps, {}> {

    private get itemTypeText(): string {
        return this.props.itemType.replace(/([a-z])([A-Z])/g, '$1 $2');
    }

    private get itemTypeClass(): string {
        return `add-item add-${this.itemTypeText.toLowerCase().replace(' ', '-')}`;
    }

    private get inputRef(): Maybe<HTMLInputElement> {
        return Maybe.fromNull(this.refs['input'] as HTMLInputElement);
    }

    private isEnterEvent(event: KeyboardEvent) {
        return event.keyCode === 13 || event.which === 13;
    }

    private addItem(input: Maybe<HTMLInputElement>): void {
        return input.filter(input => Boolean(input.value)).map(input => IO(() => {
            todoActions.addItem(AddItemType[this.props.itemType], input.value);
            input.value = ''; // FIXME: SideEffect - maybe move to store ?
        })).orJust(IO(() => {})).run();
    }

    private getClickHandler(): EventHandler<MouseEvent> {
        return (): void => {
            this.addItem(this.inputRef);
        }
    }

    private getKeyEnterHandler(): EventHandler<KeyboardEvent> {
        return (event: KeyboardEvent): void => {
            this.addItem(Some(event).filter(this.isEnterEvent).flatMap(() => this.inputRef));
        }
    }

    public render(): JSX.Element {
        return (
            <div className={this.itemTypeClass}>
                <input ref="input" type="text" onKeyUp={this.getKeyEnterHandler()} />
                <button onClick={this.getClickHandler()} className="ion">
                    <span>Add {this.itemTypeText}</span>
                </button>
            </div>
        );
    }

}
