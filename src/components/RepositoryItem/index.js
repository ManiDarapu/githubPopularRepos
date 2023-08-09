// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {repositoryItem} = props
  const {name, issuesCount, forksCount, starsCount, avatarUrl} = repositoryItem

  return (
    <li className="li">
      <img src={avatarUrl} alt={name} className="img" />
      <p>{name}</p>
      <div className="icon">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="icons"
        />
        <p>{starsCount}</p>
      </div>
      <div className="icon">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="icons"
        />
        <p>{forksCount}</p>
      </div>
      <div className="icon">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="icons"
        />
        <p>{issuesCount}</p>
      </div>
    </li>
  )
}

export default RepositoryItem
