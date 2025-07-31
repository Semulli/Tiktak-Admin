import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { MdOutlineClose } from "react-icons/md";
import Button from "../Button";

interface ModalProps {
  onClose: () => void;
  title?: string;
  loading?: boolean;
  submitText?: string;
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent) => void;
  
}

const Modal = ({
  onClose,
  title,
  loading = false,
  submitText = "Təsdiqlə",
  children,
  onSubmit,
}: ModalProps) => {
  return (
    <Transition appear show={true} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* Overlay */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" />
        </Transition.Child>

        {/* Modal wrapper */}
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="relative w-full max-w-lg bg-white rounded-xl shadow-lg p-6">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-500 hover:text-black text-2xl"
              >
                <MdOutlineClose />
              </button>

              {/* Title */}
              {title && (
                <Dialog.Title className="text-xl font-semibold text-center mb-4">
                  {title}
                </Dialog.Title>
              )}

              {/* Form */}
              <form onSubmit={onSubmit} className="space-y-4">
                {children}
                <Button
                  title={loading ? "Yüklənir..." : submitText}
                  variant="button_type1"
                  type="submit"
                />
              </form>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
