import React, {useEffect, useState} from 'react'
import {useLazyGetUserReposQuery, useSearchUsersQuery} from '../store/github/github.api'
import {useDebounce} from '../hooks/debounce'
import {RepoCard} from '../components/RepoCard'

export function HomePage() {
  const [search, setSearch] = useState('')
  const [dropdown, setDropdown] = useState(false)
// custom hook refreshed search word with settimout 
  const debounced = useDebounce(search)
  const {isLoading, isError, data} = useSearchUsersQuery(debounced, {
//conditions when requests shouldn't be sent
    skip: debounced.length < 3,
//refreshes search result when user is back to this page
    refetchOnFocus: true
  })
// 1st element of array is function (fetchRepos), that lets receiving by requests requested data
// 2nd element is all data that returns from regular requst hook useSearchUsersQuery
  const [fetchRepos, { isLoading: areReposLoading, data: repos }] = useLazyGetUserReposQuery()

  useEffect(() => {
    setDropdown(debounced.length > 3 && data?.length! > 0)
  }, [debounced, data])

  const clickHandler = (username: string) => {
    fetchRepos(username)
    setDropdown(false)
  }

  return (
// h-screen w-screen = full screen
    <div className="flex justify-center pt-10 mx-auto h-screen w-screen">
      { isError && <p className="text-center text-red-600">Something went wrong...</p> }

      <div className="relative w-[560px]">
        <input
          type="text"
// py-2 = vertical padding 2
          className="border py-2 px-4 w-full h-[42px] mb-2"
          placeholder="Search for Github username..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
{/* top-[42px] = so it's located below search line */}
        {dropdown && <ul className="list-none absolute top-[42px] left-0 right-0 max-h-[200px] overflow-y-scroll shadow-md bg-white">
          { isLoading && <p className="text-center">Loading...</p> }
{/* if data exists we map it */}
          { data?.map(user => (
            <li
              key={user.id}
              onClick={() => clickHandler(user.login)}
//transition-colors - colors animation
              className="py-2 px-4 hover:bg-gray-500 hover:text-white transition-colors cursor-pointer"
            >{ user.login }</li>
          )) }
        </ul>}

        <div className="container">
          { areReposLoading && <p className="text-center">Repos are loading...</p> }
          { repos?.map(repo => <RepoCard repo={repo} key={repo.id} />) }
        </div>
      </div>


    </div>
  )
}