import './index.css'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const switchingStatus = {
  loading: 'LOADING',
  failure: 'FAILURE',
  success: 'SUCCESS',
}

// Write your code here
class GithubPopularRepos extends Component {
  state = {
    repositoryList: [],
    id: languageFiltersData[0].id,
    isLoading: switchingStatus.loading,
  }

  componentDidMount() {
    this.getRepositoryList()
  }

  changeId = id => {
    this.setState({id}, this.getRepositoryList)
  }

  getRepositoryList = async () => {
    const {id} = this.state
    const url = `https://apis.ccbp.in/popular-repos?language=${id}`
    const response = await fetch(url)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.popular_repos.map(each => ({
        name: each.name,
        id: each.id,
        issuesCount: each.issues_count,
        forksCount: each.forks_count,
        starsCount: each.stars_count,
        avatarUrl: each.avatar_url,
      }))

      this.setState({repositoryList: updatedData, isLoading: 'SUCCESS'})
    } else {
      this.setState({isLoading: 'FAILURE'})
    }
  }

  renderLoading = () => (
    <div className="div1">
      <div className="div2">
        <h1 className="h1">Popular</h1>
        <ul className="ul">
          {languageFiltersData.map(each => (
            <LanguageFilterItem
              key={each.id}
              languageItem={each}
              id={this.changeId}
            />
          ))}
        </ul>
        <div data-testid="loader">
          <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
        </div>
      </div>
    </div>
  )

  renderFailure = () => (
    <div className="div1">
      <div className="div2">
        <h1 className="h1">Popular</h1>
        <ul className="ul">
          {languageFiltersData.map(each => (
            <LanguageFilterItem
              key={each.id}
              languageItem={each}
              id={this.changeId}
            />
          ))}
        </ul>
        <img
          src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
          alt="failure view"
        />
      </div>
    </div>
  )

  renderSuccess = () => {
    const {repositoryList} = this.state
    return (
      <div className="div1">
        <div className="div2">
          <h1 className="h1">Popular</h1>
          <ul className="ul">
            {languageFiltersData.map(each => (
              <LanguageFilterItem
                key={each.id}
                languageItem={each}
                id={this.changeId}
              />
            ))}
          </ul>
          <ul className="ul2">
            {repositoryList.map(each => (
              <RepositoryItem key={each.id} repositoryItem={each} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state
    switch (isLoading) {
      case switchingStatus.loading:
        return this.renderLoading()
      case switchingStatus.failure:
        return this.renderFailure()
      case switchingStatus.success:
        return this.renderSuccess()
      default:
        return null
    }
  }
}

export default GithubPopularRepos
