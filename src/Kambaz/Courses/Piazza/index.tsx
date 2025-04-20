import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { findPiazzaFoldersForCourse, findPiazzaPostsForCourse, createPiazzaPost, findPiazzaPostById, addStudentAnswerToPiazzaPost, addInstructorAnswerToPiazzaPost, addFollowupToPiazzaPost, addReplyToPiazzaPostFollowup } from '../client';
import { FormEvent } from 'react';

export default function Piazza() {
  const [isCreating, setIsCreating] = useState(false);
  const { cid } = useParams();
  const [folders, setFolders] = useState<string[]>([]);
  const [posts, setPosts] = useState<any[]>([]);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [selectedFolder, setSelectedFolder] = useState<string>("");
  const currentUser = useSelector((state: RootState) => state.accountReducer.currentUser);
  const [studentAnswerContent, setStudentAnswerContent] = useState<string>('');
  const [instructorAnswerContent, setInstructorAnswerContent] = useState<string>('');
  const [followupContent, setFollowupContent] = useState<string>('');
  const [replyContents, setReplyContents] = useState<{ [key: string]: string }>({});
  useEffect(() => {
    if (cid) {
      findPiazzaFoldersForCourse(cid).then(setFolders);
      findPiazzaPostsForCourse(cid).then(setPosts);
    }
  }, [cid]);
  useEffect(() => {
    if (selectedPostId) {
      findPiazzaPostById(selectedPostId).then(setSelectedPost);
    }
  }, [selectedPostId]);
  const filteredPosts = selectedFolder
    ? posts.filter(p => p.folders.includes(selectedFolder))
    : [];
  const submitStudentAnswer = async () => {
    if (!studentAnswerContent.trim() || !selectedPostId || !currentUser) return;
    try {
      const newAns = await addStudentAnswerToPiazzaPost(selectedPostId, { author: currentUser._id, content: studentAnswerContent });
      setSelectedPost((prev: any) => ({ ...prev, studentAnswers: [...(prev.studentAnswers || []), newAns] }));
      setStudentAnswerContent('');
    } catch (e) { console.error(e); }
  };
  const submitInstructorAnswer = async () => {
    if (!instructorAnswerContent.trim() || !selectedPostId || !currentUser) return;
    try {
      const newAns = await addInstructorAnswerToPiazzaPost(selectedPostId, { author: currentUser._id, content: instructorAnswerContent });
      setSelectedPost((prev: any) => ({ ...prev, instructorAnswers: [...(prev.instructorAnswers || []), newAns] }));
      setInstructorAnswerContent('');
    } catch (e) { console.error(e); }
  };
  const submitFollowup = async () => {
    if (!followupContent.trim() || !selectedPostId || !currentUser) return;
    try {
      const newFollowup = await addFollowupToPiazzaPost(selectedPostId, { author: currentUser._id, content: followupContent });
      setSelectedPost((prev: any) => ({ ...prev, followups: [...(prev.followups || []), newFollowup] }));
      setFollowupContent('');
    } catch (err) { console.error(err); }
  };
  const submitReply = async (followupId: string) => {
    const content = replyContents[followupId]?.trim();
    if (!content || !selectedPostId || !currentUser) return;
    try {
      const newReply = await addReplyToPiazzaPostFollowup(selectedPostId, followupId, { author: currentUser._id, content });
      setSelectedPost((prev: any) => ({
        ...prev,
        followups: prev.followups.map((f: any) => f._id === followupId ? { ...f, replies: [...(f.replies || []), newReply] } : f)
      }));
      setReplyContents(prev => ({ ...prev, [followupId]: '' }));
    } catch (err) { console.error(err); }
  };
  return (
    <div id="wd-piazza" className="p-3">
      <h2 className="text-danger">Piazza for Course {cid}</h2>
      <div className="d-flex mt-4" style={{ height: '80vh' }}>
        <div id="piazza-sidebar" className="border-end pe-3" style={{ width: '300px' }}>
          <button
            className="btn btn-primary w-100 mb-3"
            onClick={() => setIsCreating(true)}
          >
            New Post
          </button>
          <h6>Folders</h6>
          <ul className="list-unstyled">
            {folders.map((f) => (
              <li key={f} className="mb-1">
                <button
                  type="button"
                  className={`btn btn-link p-0 ${selectedFolder === f ? 'fw-bold text-decoration-underline' : ''}`}
                  onClick={() => setSelectedFolder(f)}
                >
                  {f}
                </button>
              </li>
            ))}
          </ul>
          <h6>Posts ({filteredPosts.length})</h6>
          <ul className="list-unstyled">
            {filteredPosts.map((p) => (
              <li key={p._id} className="mb-1">
                <button
                  type="button"
                  className="btn btn-link p-0"
                  onClick={() => {
                    setIsCreating(false);
                    setSelectedPostId(p._id);
                  }}
                >
                  {p.summary}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div id="piazza-content" className="flex-fill ps-3">
          {isCreating ? (
            <NewPostForm
              courseId={cid!}
              folders={folders}
              currentUser={currentUser!}
              onCancel={() => setIsCreating(false)}
              onSuccess={(newPost) => {
                setIsCreating(false);
                setPosts([newPost, ...posts]);
              }}
            />
          ) : selectedPost ? (
            <div>
              <h3>{selectedPost.summary}</h3>
              <p className="text-muted">
                By {selectedPost.author} on{' '}
                {new Date(selectedPost.createdAt).toLocaleString()}
              </p>
              <hr />
              <div>{selectedPost.details}</div>
              {/* Student's Answers */}
              <section className="mt-4">
                <h5>Student's Answers</h5>
                {selectedPost.studentAnswers && selectedPost.studentAnswers.length > 0 ? (
                  selectedPost.studentAnswers.map((ans: any, idx: number) => (
                    <div key={idx} className="border p-2 mb-2">
                      <p className="mb-1"><strong>{ans.author}</strong> <small>{new Date(ans.createdAt).toLocaleString()}</small></p>
                      <div>{ans.content}</div>
                    </div>
                  ))
                ) : (
                  <p>No student answers yet.</p>
                )}
                {currentUser?.role === 'STUDENT' &&
                  (!selectedPost.studentAnswers || !selectedPost.studentAnswers.find((a: any) => a.author === currentUser._id)) && (
                  <div className="mt-2">
                    <textarea className="form-control" rows={3} value={studentAnswerContent} onChange={e => setStudentAnswerContent(e.target.value)} placeholder="Write your answer..." />
                    <button className="btn btn-primary mt-2" type="button" onClick={submitStudentAnswer}>Submit Answer</button>
                  </div>
                )}
              </section>
              {/* Instructor's Answers */}
              <section className="mt-4">
                <h5>Instructor's Answers</h5>
                {selectedPost.instructorAnswers && selectedPost.instructorAnswers.length > 0 ? (
                  selectedPost.instructorAnswers.map((ans: any, idx: number) => (
                    <div key={idx} className="border p-2 mb-2">
                      <p className="mb-1"><strong>{ans.author}</strong> <small>{new Date(ans.createdAt).toLocaleString()}</small></p>
                      <div>{ans.content}</div>
                    </div>
                  ))
                ) : (
                  <p>No instructor answers yet.</p>
                )}
                {currentUser?.role === 'FACULTY' &&
                  (!selectedPost.instructorAnswers || !selectedPost.instructorAnswers.find((a: any) => a.author === currentUser._id)) && (
                  <div className="mt-2">
                    <textarea className="form-control" rows={3} value={instructorAnswerContent} onChange={e => setInstructorAnswerContent(e.target.value)} placeholder="Write your answer..." />
                    <button className="btn btn-primary mt-2" type="button" onClick={submitInstructorAnswer}>Submit Answer</button>
                  </div>
                )}
              </section>
              {/* Follow-up Discussions */}
              <section className="mt-4">
                <h5>Follow-up Discussions</h5>
                {selectedPost.followups && selectedPost.followups.length > 0 ? (
                  selectedPost.followups.map((fu: any) => (
                    <div key={fu._id} className="border p-2 mb-3">
                      <p className="mb-1"><strong>{fu.author}</strong> <small>{new Date(fu.createdAt).toLocaleString()}</small></p>
                      <div className="mb-2">{fu.content}</div>
                      {/* Replies */}
                      {fu.replies && fu.replies.length > 0 && (
                        <div className="ms-3 mb-2">
                          {fu.replies.map((r: any) => (
                            <div key={r._id} className="border p-2 mb-1">
                              <p className="mb-1"><strong>{r.author}</strong> <small>{new Date(r.createdAt).toLocaleString()}</small></p>
                              <div>{r.content}</div>
                            </div>
                          ))}
                        </div>
                      )}
                      {/* Reply form */}
                      <div className="ms-3">
                        <textarea
                          className="form-control mb-1"
                          rows={2}
                          placeholder="Write a reply..."
                          value={replyContents[fu._id] || ''}
                          onChange={e => setReplyContents(prev => ({ ...prev, [fu._id]: e.target.value }))}
                        />
                        <button
                          type="button"
                          className="btn btn-sm btn-primary"
                          onClick={() => submitReply(fu._id)}
                        >Reply</button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No follow-up discussions yet.</p>
                )}
                {/* New followup form */}
                <div className="mt-2">
                  <textarea
                    className="form-control mb-1"
                    rows={3}
                    placeholder="Start a new follow-up discussion..."
                    value={followupContent}
                    onChange={e => setFollowupContent(e.target.value)}
                  />
                  <button type="button" className="btn btn-sm btn-primary" onClick={submitFollowup}>Add Discussion</button>
                </div>
              </section>
              {/* Back Button */}
              <button className="btn btn-secondary mt-3" onClick={() => setSelectedPostId(null)}>
                ← Back to list
              </button>
            </div>
          ) : (
            <p>Select a post or click "New Post"</p>
          )}
        </div>
      </div>
    </div>
  );
}

interface NewPostFormProps {
  courseId: string;
  folders: string[];
  currentUser: any;
  onCancel: () => void;
  onSuccess: (post: any) => void;
}

function NewPostForm({ courseId, folders, currentUser, onCancel, onSuccess }: NewPostFormProps) {
  const [type, setType] = useState<'QUESTION' | 'NOTE'>('QUESTION');
  const [postTo, setPostTo] = useState<'CLASS' | 'INDIVIDUAL'>('CLASS');
  const [recipients, setRecipients] = useState<string[]>([]);
  const [selFolders, setSelFolders] = useState<string[]>([]);
  const [summary, setSummary] = useState('');
  const [details, setDetails] = useState('');
  const [error, setError] = useState<string>('');
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!summary.trim() || !details.trim() || selFolders.length === 0) {
      setError('Summary, details, and at least one folder are required');
      return;
    }
    const payload = { author: currentUser._id, type, postTo, recipients, folders: selFolders, summary, details };
    try {
      const newPost = await createPiazzaPost(courseId, payload);
      onSuccess(newPost);
    } catch (e) {
      setError('Failed to create post');
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="mb-2">
        <label>Post Type:</label>
        <select value={type} onChange={e => setType(e.target.value as any)} className="form-select">
          <option value="QUESTION">Question</option>
          <option value="NOTE">Note</option>
        </select>
      </div>
      <div className="mb-2">
        <label>Post To:</label>
        <div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" id="toClass" name="postTo" value="CLASS" checked={postTo==='CLASS'} onChange={() => setPostTo('CLASS')} />
            <label className="form-check-label" htmlFor="toClass">Entire Class</label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" id="toIndividual" name="postTo" value="INDIVIDUAL" checked={postTo==='INDIVIDUAL'} onChange={() => setPostTo('INDIVIDUAL')} />
            <label className="form-check-label" htmlFor="toIndividual">Individual</label>
          </div>
        </div>
      </div>
      {postTo === 'INDIVIDUAL' && (
        <div className="mb-2">
          <label>Recipients:</label>
          <input type="text" disabled className="form-control" placeholder="(not implemented)" />
        </div>
      )}
      <div className="mb-2">
        <label>Folders:</label>
        {folders.map(f => (
          <div key={f} className="form-check">
            <input className="form-check-input" type="checkbox" id={`folder-${f}`} checked={selFolders.includes(f)} onChange={() => {
              setSelFolders(sel => sel.includes(f) ? sel.filter(x=>x!==f) : [...sel, f]);
            }} />
            <label className="form-check-label" htmlFor={`folder-${f}`}>{f}</label>
          </div>
        ))}
      </div>
      <div className="mb-2">
        <label>Summary:</label>
        <input type="text" maxLength={100} className="form-control" value={summary} onChange={e=>setSummary(e.target.value)} placeholder="Enter a summary (max 100 chars)" />
      </div>
      <div className="mb-2">
        <label>Details:</label>
        <textarea className="form-control" rows={4} value={details} onChange={e=>setDetails(e.target.value)} placeholder="Enter details here" />
      </div>
      <button type="submit" className="btn btn-success me-2">Post</button>
      <button type="button" onClick={onCancel} className="btn btn-secondary">Cancel</button>
    </form>
  );
} 