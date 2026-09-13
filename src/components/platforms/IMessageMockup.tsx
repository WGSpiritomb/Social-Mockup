import React from 'react';
import { IMessageState, DeviceSettings } from '../../types';
import {
  ChevronLeft,
  Video,
  Info,
  Mic,
  Plus,
  ArrowUp,
  Heart,
} from 'lucide-react';

interface IMessageMockupProps {
  state: IMessageState;
  deviceSettings: DeviceSettings;
}

export const IMessageMockup: React.FC<IMessageMockupProps> = ({ state, deviceSettings }) => {
  const isDark = deviceSettings.theme === 'dark';
  const bgClass = isDark ? 'bg-black text-white' : 'bg-white text-black';
  const borderClass = isDark ? 'border-neutral-800' : 'border-neutral-200';
  const subtextClass = isDark ? 'text-neutral-400' : 'text-neutral-500';

  const isSMS = state.messageType === 'sms';
  const outgoingBubbleColor = isSMS
    ? 'bg-[#34c759] text-white' // Green for SMS
    : 'bg-[#007aff] text-white'; // Blue for iMessage

  const incomingBubbleColor = isDark
    ? 'bg-[#26252a] text-white'
    : 'bg-[#e9e9eb] text-black';

  return (
    <div className={`w-full h-full flex flex-col ${bgClass} select-none`}>
      {/* iOS Navigation Header */}
      <div className={`px-3 py-2 flex items-center justify-between border-b ${borderClass} bg-inherit/90 backdrop-blur-md`}>
        {/* Back button */}
        <div className="flex items-center text-[#007aff] font-normal cursor-pointer -ml-1">
          <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
          <span className="text-[17px] -ml-1">Messages</span>
        </div>

        {/* Center: Avatar & Contact Name */}
        <div className="flex flex-col items-center flex-1 mx-2">
          {state.mode === 'group' ? (
            <div className="flex items-center -space-x-2 mb-1">
              <img
                src={state.contactAvatar}
                alt="Member 1"
                className="w-7 h-7 rounded-full object-cover border-2 border-black"
              />
              <div className="w-7 h-7 rounded-full bg-neutral-600 text-white text-[10px] font-bold flex items-center justify-center border-2 border-black">
                +{state.groupMembersCount || 3}
              </div>
            </div>
          ) : (
            <img
              src={state.contactAvatar}
              alt={state.contactName}
              className="w-8 h-8 rounded-full object-cover mb-0.5"
            />
          )}
          <span className="text-[12px] font-semibold tracking-tight text-center truncate max-w-[130px]">
            {state.contactName}
          </span>
        </div>

        {/* Right action: FaceTime icon */}
        <div className="text-[#007aff] cursor-pointer">
          <Video className="w-5 h-5 stroke-[2]" />
        </div>
      </div>

      {/* Date / Encrypted pill */}
      <div className="text-center py-2">
        <span className={`text-[11px] font-medium ${subtextClass}`}>
          {isSMS ? 'Text Message' : 'iMessage'} · Today 9:30 AM
        </span>
      </div>

      {/* Chat Bubbles List */}
      <div className="flex-1 p-3.5 space-y-2.5 overflow-y-auto no-scrollbar flex flex-col justify-end">
        {state.chatBubbles.map((msg, index) => {
          const isMe = msg.sender === 'me';
          const isLastMessage = index === state.chatBubbles.length - 1;

          return (
            <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
              <div className="relative max-w-[75%]">
                <div
                  className={`px-4 py-2 rounded-[20px] text-[15px] leading-snug break-words tracking-tight ${
                    isMe
                      ? `${outgoingBubbleColor} rounded-br-md`
                      : `${incomingBubbleColor} rounded-bl-md`
                  }`}
                >
                  {msg.text}
                </div>

                {/* Heart Tapback Reaction */}
                {msg.liked && (
                  <div
                    className={`absolute -top-2.5 ${
                      isMe ? '-left-2' : '-right-2'
                    } w-6 h-6 rounded-full bg-white text-rose-500 shadow-md border border-neutral-200 flex items-center justify-center text-xs`}
                  >
                    ❤️
                  </div>
                )}
              </div>

              {/* Delivery / Read Status below last sent message */}
              {isMe && isLastMessage && (
                <span className={`text-[11px] font-normal ${subtextClass} mt-1 mr-1`}>
                  {state.receiptText || 'Delivered'}
                </span>
              )}
            </div>
          );
        })}

        {/* Typing Indicator */}
        {state.showTypingIndicator && (
          <div className="flex items-start">
            <div
              className={`px-3.5 py-2.5 rounded-[18px] rounded-bl-xs flex items-center space-x-1 ${incomingBubbleColor}`}
            >
              <div className="w-2 h-2 rounded-full bg-neutral-400 animate-typing-1" />
              <div className="w-2 h-2 rounded-full bg-neutral-400 animate-typing-2" />
              <div className="w-2 h-2 rounded-full bg-neutral-400 animate-typing-3" />
            </div>
          </div>
        )}
      </div>

      {/* iOS iMessage Input Bar */}
      <div className={`p-2 border-t ${borderClass} flex items-center space-x-2 bg-inherit/95 backdrop-blur-md`}>
        {/* Plus action */}
        <button className="w-7 h-7 rounded-full bg-neutral-500/20 flex items-center justify-center text-neutral-400 shrink-0">
          <Plus className="w-4 h-4" />
        </button>

        {/* Input pill */}
        <div
          className={`flex-1 flex items-center rounded-full px-3 py-1.5 border ${
            isDark ? 'border-neutral-700 bg-neutral-900' : 'border-neutral-300 bg-neutral-100'
          }`}
        >
          <input
            type="text"
            readOnly
            placeholder={isSMS ? 'Text Message' : 'iMessage'}
            className="bg-transparent text-[15px] w-full outline-hidden placeholder:text-neutral-400 text-inherit"
          />
          <Mic className="w-4 h-4 text-neutral-400 shrink-0" />
        </div>

        {/* Send Button */}
        <button
          className={`w-7 h-7 rounded-full flex items-center justify-center text-white shrink-0 ${
            isSMS ? 'bg-[#34c759]' : 'bg-[#007aff]'
          }`}
        >
          <ArrowUp className="w-4 h-4 stroke-[3]" />
        </button>
      </div>
    </div>
  );
};
