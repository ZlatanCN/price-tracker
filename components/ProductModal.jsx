'use client'

import { Modal } from 'antd';
import { useState, useRef } from 'react';
import Image from 'next/image';
import { LoadingOutlined } from '@ant-design/icons';
import { addUserEmailToProduct } from '@/lib/actions';
import PropTypes from 'prop-types';

const ProductModal = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState('');
  const modalRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    await addUserEmailToProduct(props.product._id, email);
    setIsSubmitting(false);

    setEmail('');
    setIsModalOpen(false);
  }

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className={'btn'}
      >
        Track
      </button>
      <Modal
        title={'Stay updated with product pricing alerts right in your inbox'}
        open={isModalOpen}
        footer={null}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        afterClose={() => setEmail('')}
        ref={modalRef}
      >
        <p className={'text-sm text-gray-600 mt-2'}>
          Never miss a bargain again with our timely alerts
        </p>
        <form className="flex flex-col mt-5" onSubmit={handleSubmit}>
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email address
          </label>
          <div className="dialog-input_container">
            <Image
              src="/assets/icons/mail.svg"
              alt='mail'
              width={18}
              height={18}
            />

            <input
              required
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className='dialog-input'
            />
          </div>

          <button type="submit"
                  className="dialog-btn"
          >
            {isSubmitting ? <LoadingOutlined/> : 'Track'}
          </button>
        </form>
      </Modal>
    </>
  );
};

ProductModal.propTypes = {
  product: PropTypes.object.isRequired,
};

export default ProductModal;