import React from 'react';
import { AppState, ChatMessage, SimpleComment, StoreReview } from '../../types';
import { Plus, Trash2 } from 'lucide-react';

interface MessagesManagerProps {
  state: AppState;
  onChange: (updater: (prev: AppState) => AppState) => void;
}

const DEFAULT_AVATAR =
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80';

/**
 * Shared ChatMessage[] editor for OnlyFans DM & Fansly DM
 */
const ChatMessagesListEditor: React.FC<{
  title: string;
  accentClass?: string;
  messages: ChatMessage[];
  onUpdate: (next: ChatMessage[]) => void;
}> = ({ title, accentClass = 'bg-[#00aff0] hover:bg-[#009fd9]', messages, onUpdate }) => (
  <div className="space-y-3">
    <div className="flex items-center justify-between">
      <h4 className="font-bold text-neutral-200">{title}</h4>
      <button
        type="button"
        onClick={() =>
          onUpdate([
            ...messages,
            {
              id: `msg-${Date.now()}`,
              sender: 'them',
              text: 'Thank you so much for the support! ❤️',
              timestamp: '9:15 PM',
              status: 'read',
            },
          ])
        }
        className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg ${accentClass} text-white font-semibold text-[11px] cursor-pointer`}
      >
        <Plus className="w-3.5 h-3.5" />
        <span>Add Message</span>
      </button>
    </div>

    {messages.map((msg, idx) => (
      <div
        key={msg.id}
        className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-800 space-y-2"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-neutral-400 text-[11px] tabular-nums">
              #{idx + 1}
            </span>
            <select
              value={msg.sender}
              onChange={(e) => {
                const sender = e.target.value as 'me' | 'them';
                onUpdate(messages.map((m) => (m.id === msg.id ? { ...m, sender } : m)));
              }}
              className="px-2 py-0.5 rounded bg-neutral-800 border border-neutral-700 text-white font-semibold text-[11px]"
            >
              <option value="me">Me (Outgoing)</option>
              <option value="them">Them (Incoming)</option>
            </select>
          </div>

          <button
            type="button"
            onClick={() => onUpdate(messages.filter((m) => m.id !== msg.id))}
            className="text-neutral-500 hover:text-red-400 p-0.5 cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>

        <textarea
          rows={2}
          value={msg.text}
          onChange={(e) =>
            onUpdate(
              messages.map((m) => (m.id === msg.id ? { ...m, text: e.target.value } : m))
            )
          }
          className="w-full px-2 py-1 rounded bg-neutral-800 border border-neutral-700 text-white text-xs outline-hidden focus:border-blue-500"
        />

        <input
          type="text"
          value={msg.timestamp}
          onChange={(e) =>
            onUpdate(
              messages.map((m) => (m.id === msg.id ? { ...m, timestamp: e.target.value } : m))
            )
          }
          placeholder="Timestamp (e.g. 9:15 PM)"
          className="w-full px-2 py-1 rounded bg-neutral-800 border border-neutral-700 text-white text-[11px] outline-hidden"
        />
      </div>
    ))}
  </div>
);

/**
 * Shared StoreReview[] editor for FANZA & DLsite
 */
const ReviewsListEditor: React.FC<{
  title: string;
  accentClass?: string;
  reviews: StoreReview[];
  onUpdate: (next: StoreReview[]) => void;
}> = ({ title, accentClass = 'bg-[#e60012] hover:bg-[#cc0010]', reviews, onUpdate }) => (
  <div className="space-y-3">
    <div className="flex items-center justify-between">
      <h4 className="font-bold text-neutral-200">{title}</h4>
      <button
        type="button"
        onClick={() =>
          onUpdate([
            ...reviews,
            {
              id: `rev-${Date.now()}`,
              author: 'premium_member',
              rating: 5,
              title: '最高品質の作品でした',
              text: '完成度が非常に高く、大満足の内容でした。',
              date: '2026/09/13',
              helpfulCount: 24,
            },
          ])
        }
        className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg ${accentClass} text-white font-semibold text-[11px] cursor-pointer`}
      >
        <Plus className="w-3.5 h-3.5" />
        <span>Add Review</span>
      </button>
    </div>

    {reviews.map((review) => (
      <div
        key={review.id}
        className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-800 space-y-2"
      >
        <div className="flex items-center justify-between gap-2">
          <input
            type="text"
            value={review.author}
            onChange={(e) => {
              const author = e.target.value;
              onUpdate(reviews.map((r) => (r.id === review.id ? { ...r, author } : r)));
            }}
            className="flex-1 px-2 py-1 rounded bg-neutral-800 border border-neutral-700 text-white font-bold text-xs"
            placeholder="Author"
          />
          <select
            value={review.rating}
            onChange={(e) => {
              const rating = Number(e.target.value);
              onUpdate(reviews.map((r) => (r.id === review.id ? { ...r, rating } : r)));
            }}
            className="px-2 py-1 rounded bg-neutral-800 border border-neutral-700 text-amber-400 font-bold text-xs"
          >
            {[5, 4, 3, 2, 1].map((stars) => (
              <option key={stars} value={stars}>
                {'★'.repeat(stars)}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => onUpdate(reviews.filter((r) => r.id !== review.id))}
            className="text-neutral-500 hover:text-red-400 p-0.5 cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>

        <input
          type="text"
          value={review.title}
          onChange={(e) => {
            const headline = e.target.value;
            onUpdate(reviews.map((r) => (r.id === review.id ? { ...r, title: headline } : r)));
          }}
          className="w-full px-2 py-1 rounded bg-neutral-800 border border-neutral-700 text-white font-semibold text-xs"
          placeholder="Review headline"
        />

        <textarea
          rows={2}
          value={review.text}
          onChange={(e) => {
            const text = e.target.value;
            onUpdate(reviews.map((r) => (r.id === review.id ? { ...r, text } : r)));
          }}
          className="w-full px-2 py-1 rounded bg-neutral-800 border border-neutral-700 text-white text-xs"
          placeholder="Review body"
        />

        <div className="grid grid-cols-2 gap-2">
          <input
            type="text"
            value={review.date}
            onChange={(e) => {
              const date = e.target.value;
              onUpdate(reviews.map((r) => (r.id === review.id ? { ...r, date } : r)));
            }}
            className="px-2 py-1 rounded bg-neutral-800 border border-neutral-700 text-white text-[11px] font-mono"
            placeholder="2026/09/12"
          />
          <input
            type="number"
            value={review.helpfulCount}
            onChange={(e) => {
              const helpfulCount = Number(e.target.value);
              onUpdate(reviews.map((r) => (r.id === review.id ? { ...r, helpfulCount } : r)));
            }}
            className="px-2 py-1 rounded bg-neutral-800 border border-neutral-700 text-white text-[11px] font-mono tabular-nums"
            placeholder="Helpful count"
          />
        </div>
      </div>
    ))}
  </div>
);

/**
 * Shared SimpleComment[] editor for Fanbox, Fantia, Fansly, XVideos, Pornhub, and Blacked
 */
const SimpleCommentsListEditor: React.FC<{
  title: string;
  accentClass?: string;
  comments: SimpleComment[];
  onUpdate: (next: SimpleComment[]) => void;
}> = ({ title, accentClass = 'bg-blue-600 hover:bg-blue-500 text-white', comments, onUpdate }) => (
  <div className="space-y-3">
    <div className="flex items-center justify-between">
      <h4 className="font-bold text-neutral-200">{title}</h4>
      <button
        type="button"
        onClick={() =>
          onUpdate([
            ...comments,
            {
              id: `cmt-${Date.now()}`,
              author: 'VIP_Member',
              avatar: DEFAULT_AVATAR,
              text: 'Great cinematography and production quality!',
              timestamp: 'Just now',
              likes: 42,
            },
          ])
        }
        className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg ${accentClass} font-semibold text-[11px] cursor-pointer`}
      >
        <Plus className="w-3.5 h-3.5" />
        <span>Add Comment</span>
      </button>
    </div>

    {comments.map((comment) => (
      <div
        key={comment.id}
        className="p-2.5 rounded-xl bg-neutral-950/60 border border-neutral-800 space-y-2"
      >
        <div className="flex items-center justify-between gap-2">
          <input
            type="text"
            value={comment.author}
            onChange={(e) => {
              const author = e.target.value;
              onUpdate(comments.map((c) => (c.id === comment.id ? { ...c, author } : c)));
            }}
            className="flex-1 px-2 py-1 rounded bg-neutral-800 border border-neutral-700 text-white font-bold text-xs"
            placeholder="Author"
          />
          <input
            type="text"
            value={comment.timestamp}
            onChange={(e) => {
              const timestamp = e.target.value;
              onUpdate(comments.map((c) => (c.id === comment.id ? { ...c, timestamp } : c)));
            }}
            className="w-24 px-2 py-1 rounded bg-neutral-800 border border-neutral-700 text-white text-[11px]"
            placeholder="1 day ago"
          />
          <button
            type="button"
            onClick={() => onUpdate(comments.filter((c) => c.id !== comment.id))}
            className="text-neutral-500 hover:text-red-400 p-0.5 cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>

        <textarea
          rows={2}
          value={comment.text}
          onChange={(e) => {
            const text = e.target.value;
            onUpdate(comments.map((c) => (c.id === comment.id ? { ...c, text } : c)));
          }}
          className="w-full px-2 py-1 rounded bg-neutral-800 border border-neutral-700 text-white text-xs"
          placeholder="Comment text"
        />
      </div>
    ))}
  </div>
);

export const MessagesManager: React.FC<MessagesManagerProps> = ({ state, onChange }) => {
  switch (state.activePlatform) {
    case 'fanza':
      return (
        <ReviewsListEditor
          title="FANZA Customer Reviews"
          reviews={state.fanza.reviews}
          onUpdate={(reviews) =>
            onChange((prev) => ({ ...prev, fanza: { ...prev.fanza, reviews } }))
          }
        />
      );

    case 'dlsite':
      return (
        <ReviewsListEditor
          title="DLsite User Reviews"
          accentClass="bg-[#005bac] hover:bg-[#004c98]"
          reviews={state.dlsite.reviews}
          onUpdate={(reviews) =>
            onChange((prev) => ({ ...prev, dlsite: { ...prev.dlsite, reviews } }))
          }
        />
      );

    case 'fanbox':
      return (
        <SimpleCommentsListEditor
          title="Fanbox Supporter Comments"
          accentClass="bg-[#ffcf33] hover:bg-amber-400 text-neutral-950"
          comments={state.fanbox.comments}
          onUpdate={(comments) =>
            onChange((prev) => ({ ...prev, fanbox: { ...prev.fanbox, comments } }))
          }
        />
      );

    case 'fantia':
      return (
        <SimpleCommentsListEditor
          title="Fantia Post Comments"
          accentClass="bg-[#00b377] hover:bg-[#009966] text-white"
          comments={state.fantia.comments}
          onUpdate={(comments) =>
            onChange((prev) => ({ ...prev, fantia: { ...prev.fantia, comments } }))
          }
        />
      );

    case 'onlyfans':
      if (state.onlyfans.mode === 'chat') {
        return (
          <ChatMessagesListEditor
            title="OnlyFans DM Messages"
            messages={state.onlyfans.chatMessages}
            onUpdate={(chatMessages) =>
              onChange((prev) => ({ ...prev, onlyfans: { ...prev.onlyfans, chatMessages } }))
            }
          />
        );
      }
      return null;

    case 'fansly':
      if (state.fansly.mode === 'chat') {
        return (
          <ChatMessagesListEditor
            title="Fansly DM Messages"
            accentClass="bg-[#1fa2f1] hover:bg-[#0f8bd8]"
            messages={state.fansly.chatMessages}
            onUpdate={(chatMessages) =>
              onChange((prev) => ({ ...prev, fansly: { ...prev.fansly, chatMessages } }))
            }
          />
        );
      }
      return (
        <SimpleCommentsListEditor
          title="Fansly Post Comments"
          accentClass="bg-[#1fa2f1] hover:bg-[#0f8bd8] text-white"
          comments={state.fansly.comments}
          onUpdate={(comments) =>
            onChange((prev) => ({ ...prev, fansly: { ...prev.fansly, comments } }))
          }
        />
      );

    case 'xvideos':
      return (
        <SimpleCommentsListEditor
          title="Video Comments"
          accentClass="bg-[#d92323] hover:bg-red-600 text-white"
          comments={state.xvideos.comments}
          onUpdate={(comments) =>
            onChange((prev) => ({ ...prev, xvideos: { ...prev.xvideos, comments } }))
          }
        />
      );

    case 'pornhub':
      return (
        <SimpleCommentsListEditor
          title="Pornhub Video Comments"
          accentClass="bg-[#ff9000] hover:bg-[#e58100] text-black"
          comments={state.pornhub.comments}
          onUpdate={(comments) =>
            onChange((prev) => ({ ...prev, pornhub: { ...prev.pornhub, comments } }))
          }
        />
      );

    case 'blacked':
      return (
        <SimpleCommentsListEditor
          title="Member Reviews"
          accentClass="bg-[#d4af37] hover:bg-amber-500 text-black"
          comments={state.blacked.comments}
          onUpdate={(comments) =>
            onChange((prev) => ({ ...prev, blacked: { ...prev.blacked, comments } }))
          }
        />
      );
  }
};
