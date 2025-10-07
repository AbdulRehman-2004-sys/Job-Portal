import { useSelector } from 'react-redux'
import Job from './Job'
import Navbar from './shared/Navbar'

const BookMarks = () => {
    const { bookmarks } = useSelector(store => store.job)

    return (
        <div>
            <Navbar />
            <div className='max-w-6xl mx-auto my-20'>
                <h1 className='font-bold text-xl mt-16 ml-4 mb-4'>
                    Bookmarked Jobs ({bookmarks.length})
                </h1>
                {bookmarks.length === 0 ? (
                    <p className="ml-4 text-gray-500">No bookmarks yet.</p>
                ) : (
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                        {bookmarks.map((job) => (
                            <Job key={job._id} job={job} del={true} fal={false} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default BookMarks
