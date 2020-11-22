import React from 'react';
import ModalNew from "../../components/ModalNew/ModalNew";

const withModal = (Component) => {
    class WithModal extends React.Component {
        state = {
            isOpen: false,
            isShow: false,
            title: null,
            component: null,
            callback: null
        }

        componentDidUpdate() {
            if (this.state.isShow) {
                document.body.style.overflow = 'hidden';
                document.body.style.paddingRight = '17px';
            } else {
                document.body.style.overflow = ''
                document.body.style.paddingRight = '';
            }
        }

        openModal = () => this.setState({isOpen: true, isShow: true})

        closeModal = () => {
            this.setState({isOpen: false})
            this.state.callback && this.state.callback.call()
            setTimeout(() => this.setState({isShow: false}), 300)
        }

        createModal = (Component = (<p>Пусто</p>), title = 'Заголовок', callback = null) => {
            this.setState({component: Component, title: title, callback: callback})
            this.openModal()
        }

        template = () => {
            return (
                <ModalNew {...this.state} closeModal={this.closeModal} openModal={this.openModal}>
                    {this.state.component ? this.state.component : null}
                </ModalNew>
            )
        }

        render = () => {
            return (
                <>
                    <Component closeModal={this.closeModal} createModal={this.createModal}
                               modalIsOpen={this.state.isOpen} {...this.props}/>
                    {this.state.isShow ? <this.template /> : null}
                </>
            )
        }
    }

    return WithModal;
};

export default withModal;
