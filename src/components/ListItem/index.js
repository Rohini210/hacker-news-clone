import React from "react"
import PropTypes from "prop-types"
import Timeago from "react-timeago"
import getSiteHostName from "utils/getSiteHostName"
import getArticleLink, { HN_USER, HN_ITEM } from "utils/getArticleLink"

import { Item, Title, Host, ExternalLink, Description, CommentLink } from "./styles"

const LINK_REL = "noopener noreferrer nofollow"

const ListItem = ({ by, kids = [], score, url, title, id, type, time }) => {
  const site = getSiteHostName(url) || "new.ycombinator.com"
  const link = getArticleLink({ url, id })
  const commentUrl = `${HN_ITEM}${id}`
  const userUrl = `${HN_USER}${by}`

  return (
    <Item>
      <ExternalLink href={link} rel={LINK_REL} taget="_blank">
        <Title>
          {title} <Host>({site})</Host>
        </Title>
      </ExternalLink>
      <Description>
        {score} points by {""}
        <CommentLink href={userUrl} rel={LINK_REL} target="_blank">
          {by}
        </CommentLink>
        {Timeago.format(new Date(time * 1000).toISOString())} {' | '}
        <CommentLink href={commentUrl} rel={LINK_REL} target="_blank">
          {kids.length} Comments
        </CommentLink>
      </Description>
    </Item>
  )
}

ListItem.propTypes = {
  by: PropTypes.string.isRequired,
  kids: PropTypes.array,
  score: PropTypes.number.isRequired,
  url: PropTypes.string,
  title: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  time: PropTypes.number.isRequired,
}
export default ListItem
