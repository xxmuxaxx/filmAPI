import React from 'react';
import ModalNew from "../../components/ModalNew/ModalNew";

const withModal = (Component) => {
    class WithModal extends React.Component {
        state = {
            isOpen: false,
            isShow: false,
            title: null,
            component: null,
        }

        openModal = () => this.setState({isOpen: true, isShow: true})
        closeModal = () => {
            this.setState({isOpen: false})
            setTimeout(() => this.setState({isShow: false}), 300)
        }

        createModal = (Component = <p>Пусто</p>, title = 'Заголовок') => {
            this.setState({component: Component, title: title})
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
                    <Component {...this.props} openModal={this.openModal} createModal={this.createModal}/>
                    {this.state.isShow ? <this.template /> : null}
                </>
            )
        }
    }

    return WithModal;
};

export default withModal;