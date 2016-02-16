//import * as React from 'react';
//import { Component, Children } from 'react';
//import { Store } from 'redux';
//import { OnDidMount, OnWillUnmount } from 'react-implementables';
//
//const theStore: Store<any>;
//
//export interface ISubscribedMixin extends OnDidMount, OnWillUnmount {
//    unsubscribe_: Function;
//    prevState_: any;
//}
//
//interface ISubscribedComponent<P, S> extends Component<P, S>, ISubscribedMixin {}
//
//export function subscribedMixin<P, S>(component: ISubscribedComponent<P, S>) {
//    Object.assign(component, {
//
//        unsubscribe_: () => {},
//        prevState_: null,
//
//        componentDidMount() {
//            this.unsubscribe_ = theStore.subscribe(() => {
//                const newState = theStore.getState();
//                if (newState !== this.prevState_) {
//                    this.setState(theStore.getState());
//                }
//                this.prevState_ = newState;
//            });
//        },
//
//        componentWillUnmount() {
//            this.unsubscribe_();
//        }
//
//    } as ISubscribedMixin);
//}