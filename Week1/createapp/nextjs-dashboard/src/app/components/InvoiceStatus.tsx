//npm install --save clsx
import clsx from 'clsx';
 
//nhận 1 prop kiểu string
export default function InvoiceStatus({ status }: { status: string }) {
  return (
    <>
        <span
        className={clsx(
            'inline-flex items-center rounded-full px-2 py-1 text-sm',
            {
            'bg-gray-100 text-gray-500': status === 'pending',
            'bg-green-500 text-white': status === 'paid',
            },
        )}
        //=> tuỳ vào giá trị của status mà sẽ áp dụng các class tương ứng để thay đổi giao diện
        >
            Status
        </span>
    </>
)
}