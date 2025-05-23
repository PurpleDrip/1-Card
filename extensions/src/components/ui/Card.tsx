export const Card = () => {
  return (
    <div className='relative w-4/5 bg-blue-200 p-4 rounded-xl flex items-center justify-center flex-col gap-4'>
        <div className="px-4 flex items-center justify-between w-full">
            <h1 className='text-2xl font-bold'>Username's Card</h1>
            <h1 className="text-sm">Status</h1>
        </div>
        <div>
            <h1 className='text-[2rem]'>1234-1234-1234-1234</h1>
        </div>
        <section className='flex items-center justify-between w-full px-8'>
            <section className='flex flex-col gap-2'>
                <h1 className='text-sm'>Card Holders Name</h1>
                <h1 className='text-sm'>Something</h1>
            </section>
            <section>
                <h1 className='text-sm'>Something</h1>
                <h1 className='text-sm'>Something</h1>
            </section>
        </section>
    </div>
  )
}
