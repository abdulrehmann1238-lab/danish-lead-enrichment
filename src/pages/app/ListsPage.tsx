import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ProspectList, Contact } from '../../types';
import { 
  ListFilter, 
  Plus, 
  Trash2, 
  Copy, 
  Download, 
  Search, 
  ExternalLink, 
  X, 
  Check, 
  Users, 
  ArrowLeft,
  Mail,
  Phone,
  Building2
} from 'lucide-react';
import { Badge } from '../../components/common/Badge';

export const ListsPage: React.FC = () => {
  const { lists, contacts, createList, updateList, deleteList, removeContactFromList, exportContacts } = useApp();
  
  const [selectedList, setSelectedList] = useState<ProspectList | null>(null);
  const [searchInList, setSearchInList] = useState('');
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [newListName, setNewListName] = useState('');
  const [newListDesc, setNewListDesc] = useState('');
  const [newListCategory, setNewListCategory] = useState('Prospects');

  const handleCreateList = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newListName.trim()) return;
    createList(newListName, newListDesc, newListCategory);
    setNewListName('');
    setNewListDesc('');
    setCreateModalOpen(false);
  };

  const handleExportThisList = (list: ProspectList) => {
    const listContacts = contacts.filter(c => list.contactIds.includes(c.id));
    exportContacts(listContacts, `${list.name.replace(/\s+/g, '_')}_Export.csv`);
  };

  const handleDuplicateList = (list: ProspectList) => {
    createList(`${list.name} (Copy)`, list.description, list.category);
  };

  // If a list is opened, show detailed saved contacts view
  if (selectedList) {
    const savedContacts = contacts.filter(c => selectedList.contactIds.includes(c.id));
    const filteredSaved = savedContacts.filter(c => 
      c.name.toLowerCase().includes(searchInList.toLowerCase()) ||
      c.company.toLowerCase().includes(searchInList.toLowerCase()) ||
      c.jobTitle.toLowerCase().includes(searchInList.toLowerCase())
    );

    return (
      <div className="space-y-6 animate-fade-in pb-16">
        {/* Back and List Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <button
              onClick={() => setSelectedList(null)}
              className="inline-flex items-center space-x-1 text-xs text-[#739181] hover:underline mb-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to all lists</span>
            </button>
            <div className="flex items-center space-x-2">
              <h1 className="font-display text-2xl font-bold text-[#202923] dark:text-white">
                {selectedList.name}
              </h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#E9EEE9] dark:bg-[#25332C] text-[#203C34] dark:text-[#8BB09D] font-bold">
                {selectedList.category}
              </span>
            </div>
            <p className="text-xs text-[#758078] dark:text-[#8E9C93]">
              {selectedList.description} • {savedContacts.length} contacts
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleExportThisList(selectedList)}
              className="px-3.5 py-2 rounded-xl bg-[#203C34] text-white text-xs font-semibold hover:bg-[#2c544a] transition-all flex items-center space-x-1.5 shadow-subtle"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export List CSV</span>
            </button>
          </div>
        </div>

        {/* Search within list */}
        <div className="p-3.5 rounded-xl bg-white dark:bg-[#1C2420] border border-[#E8ECE7] dark:border-[#2C3731] shadow-card">
          <div className="relative">
            <Search className="w-4 h-4 text-[#758078] absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search contacts inside this list..."
              value={searchInList}
              onChange={(e) => setSearchInList(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-[#E8ECE7] dark:border-[#2C3731] bg-[#F7F8F5] dark:bg-[#141A17] text-[#202923] dark:text-white focus:outline-none focus:border-[#203C34]"
            />
          </div>
        </div>

        {/* Table of contacts in this list */}
        <div className="bg-white dark:bg-[#1C2420] rounded-2xl border border-[#E8ECE7] dark:border-[#2C3731] shadow-card overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#E8ECE7] dark:border-[#2C3731] bg-[#F7F8F5]/60 dark:bg-[#141A17]/60 text-[11px] font-semibold text-[#758078] uppercase">
                <th className="py-3 px-4">Contact</th>
                <th className="py-3 px-3">Company & CVR</th>
                <th className="py-3 px-3">Region</th>
                <th className="py-3 px-3">Email Status</th>
                <th className="py-3 px-3">Phone</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8ECE7] dark:divide-[#2C3731]">
              {filteredSaved.map(contact => (
                <tr key={contact.id} className="hover:bg-[#F3F5F2] dark:hover:bg-[#232C27] transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-semibold text-[#202923] dark:text-white">{contact.name}</div>
                    <div className="text-[11px] text-[#758078]">{contact.jobTitle}</div>
                  </td>
                  <td className="py-3 px-3">
                    <div className="font-medium text-[#202923] dark:text-white">{contact.company}</div>
                    <div className="text-[10px] font-mono text-[#758078]">CVR: {contact.cvr}</div>
                  </td>
                  <td className="py-3 px-3 text-[#758078]">{contact.region}</td>
                  <td className="py-3 px-3">
                    <Badge variant={contact.revealedEmail ? 'verified' : 'not_revealed'}>
                      {contact.revealedEmail ? contact.email : 'Reveal Required'}
                    </Badge>
                  </td>
                  <td className="py-3 px-3 font-mono text-[11px] text-[#758078]">
                    {contact.revealedPhone ? contact.phone : '+45 •• •• •• ••'}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => removeContactFromList(selectedList.id, contact.id)}
                      className="text-[#B85D57] hover:underline text-[11px]"
                    >
                      Remove from list
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredSaved.length === 0 && (
            <div className="py-8 text-center text-xs text-[#758078]">
              No contacts found in this list. Add contacts from the Contact Database.
            </div>
          )}
        </div>
      </div>
    );
  }

  // Lists overview
  return (
    <div className="space-y-6 animate-fade-in pb-16">
      {/* Top Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#202923] dark:text-white">
            Your Prospect Lists
          </h1>
          <p className="text-xs sm:text-sm text-[#758078] dark:text-[#8E9C93] mt-1">
            Segment, curate, and export targeted Danish accounts and decision-maker groups.
          </p>
        </div>

        <button
          onClick={() => setCreateModalOpen(true)}
          className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-[#203C34] text-white text-xs font-semibold hover:bg-[#2c544a] shadow-subtle transition-all self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Create New List</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-white dark:bg-[#1C2420] border border-[#E8ECE7] dark:border-[#2C3731] shadow-card">
          <div className="text-[11px] text-[#758078] uppercase font-mono font-semibold">Total Lists</div>
          <div className="text-2xl font-bold text-[#202923] dark:text-white font-mono mt-1">{lists.length}</div>
          <div className="text-[11px] text-[#758078] mt-0.5">Active prospect segments</div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-[#1C2420] border border-[#E8ECE7] dark:border-[#2C3731] shadow-card">
          <div className="text-[11px] text-[#758078] uppercase font-mono font-semibold">Total Saved Contacts</div>
          <div className="text-2xl font-bold text-[#3D8060] font-mono mt-1">
            {lists.reduce((acc, l) => acc + l.contactIds.length, 0)}
          </div>
          <div className="text-[11px] text-[#758078] mt-0.5">Across all lists</div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-[#1C2420] border border-[#E8ECE7] dark:border-[#2C3731] shadow-card">
          <div className="text-[11px] text-[#758078] uppercase font-mono font-semibold">Recently Updated</div>
          <div className="text-sm font-semibold text-[#202923] dark:text-white mt-2 truncate">
            {lists[0]?.name || 'N/A'}
          </div>
          <div className="text-[11px] text-[#758078] mt-0.5">{lists[0]?.updatedAt || 'N/A'}</div>
        </div>
      </div>

      {/* Lists Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {lists.map((list) => (
          <div
            key={list.id}
            className="p-5 rounded-2xl bg-white dark:bg-[#1C2420] border border-[#E8ECE7] dark:border-[#2C3731] shadow-card hover:shadow-dropdown transition-all flex flex-col justify-between space-y-4 group"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#E9EEE9] dark:bg-[#25332C] text-[#203C34] dark:text-[#8BB09D] font-bold">
                  {list.category}
                </span>
                <span className="text-xs font-mono text-[#758078] flex items-center space-x-1">
                  <Users className="w-3.5 h-3.5 text-[#739181]" />
                  <span>{list.contactIds.length} contacts</span>
                </span>
              </div>

              <h3 
                onClick={() => setSelectedList(list)}
                className="font-display text-base font-bold text-[#202923] dark:text-white group-hover:text-[#203C34] dark:group-hover:text-[#8BB09D] cursor-pointer transition-colors"
              >
                {list.name}
              </h3>
              <p className="text-xs text-[#758078] dark:text-[#8E9C93] line-clamp-2 leading-relaxed">
                {list.description}
              </p>
            </div>

            <div className="pt-3 border-t border-[#E8ECE7] dark:border-[#2C3731] flex items-center justify-between text-xs">
              <span className="text-[11px] text-[#758078] font-mono">
                Updated {list.updatedAt}
              </span>

              <div className="flex items-center space-x-1.5">
                <button
                  onClick={() => setSelectedList(list)}
                  className="px-2.5 py-1 rounded-md bg-[#F3F5F2] dark:bg-[#232C27] hover:bg-[#E9EEE9] text-[11px] font-semibold text-[#202923] dark:text-white"
                >
                  Open
                </button>
                <button
                  onClick={() => handleExportThisList(list)}
                  className="p-1 rounded-md text-[#758078] hover:text-[#202923] dark:hover:text-white"
                  title="Export to CSV"
                >
                  <Download className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDuplicateList(list)}
                  className="p-1 rounded-md text-[#758078] hover:text-[#202923] dark:hover:text-white"
                  title="Duplicate list"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => deleteList(list.id)}
                  className="p-1 rounded-md text-[#758078] hover:text-[#B85D57]"
                  title="Delete list"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create List Modal */}
      {createModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 command-backdrop">
          <div className="w-full max-w-md bg-white dark:bg-[#1C2420] rounded-2xl shadow-modal border border-[#E8ECE7] dark:border-[#2C3731] p-6 space-y-4 animate-fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8ECE7] dark:border-[#2C3731]">
              <h3 className="font-display font-bold text-sm text-[#202923] dark:text-white">
                Create Prospect List
              </h3>
              <button onClick={() => setCreateModalOpen(false)} className="text-[#758078]">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateList} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-[#202923] dark:text-white mb-1">List Name</label>
                <input
                  type="text"
                  placeholder="e.g. Odense Robotics Leaders"
                  value={newListName}
                  onChange={(e) => setNewListName(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded-xl border border-[#E8ECE7] dark:border-[#2C3731] bg-[#F7F8F5] dark:bg-[#141A17] text-[#202923] dark:text-white focus:outline-none focus:border-[#203C34]"
                  autoFocus
                />
              </div>

              <div>
                <label className="block font-semibold text-[#202923] dark:text-white mb-1">Description</label>
                <textarea
                  placeholder="Target criteria, campaign notes, or segment specifics..."
                  value={newListDesc}
                  onChange={(e) => setNewListDesc(e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 rounded-xl border border-[#E8ECE7] dark:border-[#2C3731] bg-[#F7F8F5] dark:bg-[#141A17] text-[#202923] dark:text-white focus:outline-none focus:border-[#203C34]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#202923] dark:text-white mb-1">Category</label>
                <input
                  type="text"
                  placeholder="e.g. Technology, Sales, CleanTech"
                  value={newListCategory}
                  onChange={(e) => setNewListCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#E8ECE7] dark:border-[#2C3731] bg-[#F7F8F5] dark:bg-[#141A17] text-[#202923] dark:text-white focus:outline-none focus:border-[#203C34]"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setCreateModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-[#758078] hover:text-[#202923]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#203C34] text-white font-semibold hover:bg-[#2c544a]"
                >
                  Create List
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
