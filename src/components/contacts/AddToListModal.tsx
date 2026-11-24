import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ListFilter, Plus, Check, X } from 'lucide-react';

interface AddToListModalProps {
  selectedContactIds: string[];
  onClose: () => void;
  onSuccess: () => void;
}

export const AddToListModal: React.FC<AddToListModalProps> = ({
  selectedContactIds,
  onClose,
  onSuccess,
}) => {
  const { lists, addContactsToList, createList } = useApp();
  const [selectedListId, setSelectedListId] = useState(lists[0]?.id || '');
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [newListName, setNewListName] = useState('');
  const [newListCategory, setNewListCategory] = useState('Prospects');

  const handleSave = () => {
    let targetListId = selectedListId;
    if (isCreatingNew) {
      if (!newListName.trim()) return;
      const newList = createList(newListName, 'Custom list created from database selection', newListCategory);
      targetListId = newList.id;
    }

    if (targetListId) {
      addContactsToList(targetListId, selectedContactIds);
      onSuccess();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 command-backdrop">
      <div 
        className="w-full max-w-md bg-white dark:bg-[#1C2420] rounded-2xl shadow-modal border border-[#E8ECE7] dark:border-[#2C3731] overflow-hidden animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b border-[#E8ECE7] dark:border-[#2C3731]">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#E9EEE9] dark:bg-[#25332C] text-[#203C34] dark:text-[#8BB09D] flex items-center justify-center">
              <ListFilter className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display text-sm font-bold text-[#202923] dark:text-white">
                Add to Prospect List
              </h3>
              <p className="text-xs text-[#758078] dark:text-[#8E9C93]">
                Assign {selectedContactIds.length} contact(s) to a target list
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#758078] hover:text-[#202923] dark:hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-4 text-xs">
          {!isCreatingNew ? (
            <div className="space-y-3">
              <label className="block font-semibold text-[#202923] dark:text-white">
                Choose Existing List
              </label>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {lists.map((l) => (
                  <button
                    key={l.id}
                    type="button"
                    onClick={() => setSelectedListId(l.id)}
                    className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                      selectedListId === l.id
                        ? 'border-[#203C34] bg-[#E9EEE9]/40 dark:bg-[#25332C]/40 font-semibold'
                        : 'border-[#E8ECE7] dark:border-[#2C3731] hover:bg-[#F3F5F2] dark:hover:bg-[#232C27]'
                    }`}
                  >
                    <div>
                      <div className="text-[#202923] dark:text-white">{l.name}</div>
                      <div className="text-[10px] text-[#758078]">{l.category} • {l.contactIds.length} contacts</div>
                    </div>
                    {selectedListId === l.id && <Check className="w-4 h-4 text-[#203C34] dark:text-[#8BB09D]" />}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setIsCreatingNew(true)}
                className="w-full py-2 px-3 rounded-lg border border-dashed border-[#739181] text-[#739181] font-medium flex items-center justify-center space-x-1.5 hover:bg-[#E9EEE9]/30 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Create New List</span>
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <div>
                <label className="block font-semibold text-[#202923] dark:text-white mb-1">
                  List Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Aarhus CleanTech Executives"
                  value={newListName}
                  onChange={(e) => setNewListName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#E8ECE7] dark:border-[#2C3731] bg-[#F7F8F5] dark:bg-[#141A17] text-[#202923] dark:text-white focus:outline-none focus:border-[#203C34]"
                  autoFocus
                />
              </div>

              <div>
                <label className="block font-semibold text-[#202923] dark:text-white mb-1">
                  Category
                </label>
                <input
                  type="text"
                  placeholder="e.g. Manufacturing, Sales, CleanTech"
                  value={newListCategory}
                  onChange={(e) => setNewListCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#E8ECE7] dark:border-[#2C3731] bg-[#F7F8F5] dark:bg-[#141A17] text-[#202923] dark:text-white focus:outline-none focus:border-[#203C34]"
                />
              </div>

              <button
                type="button"
                onClick={() => setIsCreatingNew(false)}
                className="text-[11px] text-[#758078] hover:underline"
              >
                ← Back to existing lists
              </button>
            </div>
          )}
        </div>

        <div className="p-4 bg-[#F7F8F5] dark:bg-[#141A17] border-t border-[#E8ECE7] dark:border-[#2C3731] flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-medium text-[#758078] hover:text-[#202923] dark:hover:text-white"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2 rounded-xl text-xs font-semibold bg-[#203C34] text-white hover:bg-[#2c544a] transition-all shadow-subtle"
          >
            Add to List
          </button>
        </div>
      </div>
    </div>
  );
};
