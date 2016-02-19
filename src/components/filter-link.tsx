import * as React from 'react';
import { Component } from 'react';

import { todoActions } from '../services/todo-actions';
import { FilterType } from '../../todo-lib/filters';

interface IFilterLinkProps {
    filterType: string;
}

export class FilterLink extends Component<IFilterLinkProps, {}> {

    private getApplyFilterAction(filterType: string) {
        return () => {
            todoActions.setFilter(FilterType[filterType]);
        };
    }

    public render(): JSX.Element {
        return (
            <filter-link>
                <button onClick={this.getApplyFilterAction(this.props.filterType)}>
                    {this.props.filterType}
                </button>
            </filter-link>
        );
    }

}
