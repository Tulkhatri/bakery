import React, { useState } from 'react'
import { Modal } from 'antd';
const Card = (props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <> <Modal title="  " open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}> </Modal>
            <div className="card_view" onClick={() => setIsModalOpen(true)}>
                <div className="card_image">{props.items.image}</div>
                <div className="card_name">{props.items.name}</div>
                <div className="card_price">{props.items.price}</div>
            </div>
        </>
    );
}
export default Card;