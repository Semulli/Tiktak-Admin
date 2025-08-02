import { Fragment } from "react";
import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import Button from "../..//Button";
import image from "../../../../assets/images/delete_img.svg";
import type { DeleteModalProps } from "../../../../interface";

const DeleteModal = ({ onClose, onConfirm, isOpen }: DeleteModalProps) => {
  return (

    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="bg-white p-8 rounded-lg shadow-lg w-[650px] text-center">
                <img
                  src={image}
                  alt="delete_img"
                  className="mx-auto mb-4 w-[300px] h-[300px]"
                />
                <DialogTitle
                  as="h1"
                  className="text-[28px] font-medium text-[#1A1D28] mb-6"
                >
                  Məlumatı silməyə əminsinizmi?
                </DialogTitle>
                <div className="flex justify-center gap-4">
                  <Button
                    title="Təsdiqlə"
                    variant="button_type1"
                    click={onConfirm}
                  />
                  <Button
                    title="İndi yox"
                    variant="button_type3"
                    click={onClose}
                  />
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>

        </div>
      </Dialog>
    </Transition>
  );
};

export default DeleteModal;
