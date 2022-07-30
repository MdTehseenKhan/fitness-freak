import { useState, useEffect } from "react"
import { fetchData, exerciseOptions } from "../utils/fetchData"
import HorizontalScrollbar from "./HorizontalScrollbar"

const SearchExercises = ({ setExercises, bodyPart, setBodyPart }) => {
  const [search, setSearch] = useState("")
  const [bodyParts, setBodyParts] = useState([])

  const handleSearch = async (e) => {
    e.preventDefault()
    if (search === "") return

    const exercisesData = await fetchData(
      "https://exercisedb.p.rapidapi.com/exercises",
      exerciseOptions
    )

    const searchedExercises = exercisesData.filter(
      (exercise) =>
        exercise.name.inculdes(search) ||
        exercise.target.inculdes(search) ||
        exercise.bodyPart.inculdes(search) ||
        exercise.equipment.inculdes(search)
    )

    setSearch("")
    setExercises(searchedExercises)
  }

  useEffect(() => {
    const fetchExercisesData = async () => {
      const bodyPartsData = await fetchData(
        "https://exercisedb.p.rapidapi.com/exercises/bodyPartList",
        exerciseOptions
      )

      setBodyParts(["all", ...bodyPartsData])
    }

    fetchExercisesData()
  }, [])

  return (
    <>
      <section className="font-body">
        <div className="">
          <div className="text-3xl md:text-5xl font-bold text-center mb-20 dark:text-gray-200">
            Awesome Exercises <br /> You Should Know
          </div>
        </div>

        {/* SearchBar */}
        <form onSubmit={handleSearch} className="container m-auto">
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
          >
            Search
          </label>
          <div className="relative m-auto w-11/12 md:w-full">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value.toLowerCase())}
              placeholder="Search Exercises..."
              id="default-search"
              className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
            <button
              onClick={handleSearch}
              className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </form>

        {/* Horizontal Scrollbar */}
        <div className="p-5 w-full relative">
          <HorizontalScrollbar
            data={bodyParts}
            bodyPart={bodyPart}
            setBodyPart={setBodyPart}
          />
        </div>
      </section>
    </>
  )
}

export default SearchExercises
