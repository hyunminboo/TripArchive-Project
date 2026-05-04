import React, { useState, useEffect } from 'react'
import './ProfileComponentAll.scss'
import { useAuth } from '@/store/auth.store'
import { getMyTags } from '@/api/tag.api'
import { getPosts } from '@/api/post.api'
import { PROFILE_ICONS } from '../../constants/profileIcon'
const ProfileSummary = () => {
  const [tags, setTags] = useState([])
  const { member, isReady } = useAuth()
  const [posts, setPosts] = useState([])



  const loadMyTags = async () => {
    const res = await getMyTags()
    const list = Array.isArray(res) ? res : res?.data ?? []

    setTags(
      list.map((t) => ({
        id: t.id,
        label: typeof t === 'string' ? t : t.label ?? t.name
      }))
    )
  }


  const loadMyPosts = async () => {
    try {
      const res = await getPosts()

      const list = Array.isArray(res) ? res : res?.data ?? []
      setPosts(list)
    } catch (error) {
      console.error(error)
      setPosts([])
    }
  }

  useEffect(() => {
    loadMyTags()
    loadMyPosts()
  }, [])

  const formatDate = (dateStr) => {
    if (!dateStr) return ''

    return new Date(dateStr).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }


  return (
    <div className='profile-card'>
      <h4>활동 요약</h4>
      <ul className="profile-activity-list">
        <li>
          <span className='activity-label'>
            작성 메모
          </span>
          <span className='activity-value'>
            <span>
              {posts.length}
            </span>
            개</span>
        </li>
        <li>
          <span className='activity-label'>
            사용 태그
          </span>
          <span className='activity-value'>
            <span>
              {tags.length}

            </span>

            개</span>
        </li>
        <li>
          <span className='activity-label'>
            가입일
          </span>
          <span className='activity-value'>{formatDate(member.createdAt)}</span>
        </li>
      </ul>
    </div>
  )
}

export default ProfileSummary