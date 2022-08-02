import { useExercisesData } from "../contexts/ExercisesDataContext"

const Pagination = () => {
  const { searchedExercises, currentPage, setCurrentPage, exercisesPerPage } =
    useExercisesData()

  // const totalNumberOfPages = Math.ceil(searchedExercises.length / exercisesPerPage )
  const totalNumberOfPages = 100

  const numberOfPages = []
  for (let i = 1; i <= totalNumberOfPages; i++) {
    numberOfPages.push(i)
  }

  const paginate = (e) => setCurrentPage(e.target.value)
  const paginatePrevious = () => setCurrentPage((prev) => prev - 1)
  const paginateNext = () => setCurrentPage((prev) => prev + 1)

  if (totalNumberOfPages <= 0) return

  return (
    <nav className="flex w-full justify-center mx-auto">
      <div className="inline-flex -space-x-px rounded-lg">
        {/* Previous */}
        {currentPage > 1 && (
          <>
            <button
              className="pagination-navigation rounded-l-lg"
              onClick={paginatePrevious}
            >
              Previous
            </button>
          </>
        )}

        {/* Numbers */}
        {numberOfPages?.map((number) => {
          if (currentPage + 7 > number) {
            return (
              <button
                key={number}
                className="pagination-btn"
                value={number}
                onClick={paginate}
              >
                {number}
              </button>
            )
          }
        })}

        {/* Next */}
        {currentPage < totalNumberOfPages && (
          <>
            <button
              className="pagination-navigation rounded-r-lg"
              onClick={paginateNext}
            >
              Next
            </button>
          </>
        )}
      </div>
    </nav>
  )
}

export default Pagination