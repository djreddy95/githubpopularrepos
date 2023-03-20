import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const apiStatusDataView = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

class GithubPopularRepos extends Component {
  state = {
    apiStatus: apiStatusDataView.initial,
    activeTabId: languageFiltersData[0].id,
    reposeData: [],
  }

  componentDidMount() {
    this.getReposeData()
  }

  getReposeData = async () => {
    const {activeTabId} = this.state
    this.setState({
      apiStatus: apiStatusDataView.inProgress,
    })

    const url = `https://apis.ccbp.in/popular-repos?language=${activeTabId}`
    const response = await fetch(url)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.popular_repos.map(eachReposeData => ({
        name: eachReposeData.name,
        id: eachReposeData.id,
        issuesCount: eachReposeData.issues_count,
        forksCount: eachReposeData.forks_count,
        starsCount: eachReposeData.stars_count,
        avatarUrl: eachReposeData.avatar_url,
      }))
      this.setState({
        reposeData: updatedData,
        apiStatus: apiStatusDataView.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusDataView.failure,
      })
    }
  }

  inProgressView = () => (
    <div className="loader" data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  getFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure"
      />
      <h1 className="failure-heading">Something Went Wrong</h1>
    </div>
  )

  getFetchedReposeData = () => {
    const {reposeData} = this.state

    return (
      <ul className="fetched-data-container">
        {reposeData.map(eachFetchData => (
          <RepositoryItem
            key={eachFetchData.id}
            fetchedDetails={eachFetchData}
          />
        ))}
      </ul>
    )
  }

  getFetchedReposeView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusDataView.success:
        return this.getFetchedReposeData()
      case apiStatusDataView.failure:
        return this.getFailureView()
      case apiStatusDataView.inProgress:
        return this.inProgressView()
      default:
        return null
    }
  }

  getActiveFilteredId = filterId => {
    this.setState({activeTabId: filterId}, this.getReposeData)
  }

  render() {
    const {activeTabId} = this.state
    return (
      <div className="popular-container">
        <h1 className="heading">Popular</h1>
        <ul className="filter-container">
          {languageFiltersData.map(eachData => (
            <LanguageFilterItem
              eachDataDetails={eachData}
              key={eachData.id}
              isActive={eachData.id === activeTabId}
              setActiveFilteredId={this.getActiveFilteredId}
            />
          ))}
        </ul>
        {this.getFetchedReposeView()}
      </div>
    )
  }
}

export default GithubPopularRepos
