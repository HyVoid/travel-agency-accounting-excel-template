import React, { useState, useMemo } from 'react';
import { Booking, SystemConfig, TourType, BookingStatus } from '../types';
import { calculateTripDurationDays, getMonthString } from '../utils/calculations';
import { exportArrayToCSV } from '../utils/csvHelper';
import { StatusBadge } from '../components/StatusBadge';
import {
  Plus,
  Trash2,
  Search,
  Download,
  Calendar,
  AlertTriangle,
  Eye,
} from 'lucide-react';

interface BookingsViewProps {
  bookings: Booking[];
  config: SystemConfig;
  onUpdateBooking: (id: string, updated: Partial<Booking>) => void;
  onAddBooking: (booking: Booking) => void;
  onDeleteBooking: (id: string) => void;
  onSelectBooking: (bookingId: string) => void;
}

export const BookingsView: React.FC<BookingsViewProps> = ({
  bookings,
  config,
  onUpdateBooking,
  onAddBooking,
  onDeleteBooking,
  onSelectBooking,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddingNew, setIsAddingNew] = useState(false);

  // Form state for new booking
  const [newBooking, setNewBooking] = useState<Partial<Booking>>({
    id: `BK-${config.analysisYear}-${String(bookings.length + 1).padStart(3, '0')}`,
    bookingDate: new Date().toISOString().split('T')[0],
    tourType: 'Group',
    client: config.b2bClients[0] || '',
    destination: config.destinations[0] || '',
    travelDate: new Date().toISOString().split('T')[0],
    returnDate: new Date().toISOString().split('T')[0],
    pax: 20,
    salesRep: config.salesReps[0] || '',
    status: 'Confirmed',
    notes: '',
  });

  // Calculate duplicate counts
  const idCounts = useMemo(() => {
    const counts = new Map<string, number>();
    bookings.forEach((b) => counts.set(b.id, (counts.get(b.id) || 0) + 1));
    return counts;
  }, [bookings]);

  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => {
      const q = searchTerm.toLowerCase();
      return (
        searchTerm === '' ||
        b.id.toLowerCase().includes(q) ||
        b.client.toLowerCase().includes(q) ||
        b.destination.toLowerCase().includes(q) ||
        b.salesRep.toLowerCase().includes(q)
      );
    });
  }, [bookings, searchTerm]);

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBooking.id) return;
    onAddBooking(newBooking as Booking);
    setIsAddingNew(false);
    // Reset for next
    setNewBooking({
      id: `BK-${config.analysisYear}-${String(bookings.length + 2).padStart(3, '0')}`,
      bookingDate: new Date().toISOString().split('T')[0],
      tourType: 'Group',
      client: config.b2bClients[0] || '',
      destination: config.destinations[0] || '',
      travelDate: new Date().toISOString().split('T')[0],
      returnDate: new Date().toISOString().split('T')[0],
      pax: 20,
      salesRep: config.salesReps[0] || '',
      status: 'Confirmed',
      notes: '',
    });
  };

  const handleExportCSV = () => {
    const headers = [
      'Booking ID',
      'Booking Date',
      'Tour Type',
      'B2B Client',
      'Destination',
      'Travel Start',
      'Return Date',
      'PAX',
      'Sales Rep',
      'Status',
      'Duration Days',
      'Travel Month',
      'Active For Accounting',
    ];
    const rows = filteredBookings.map((b) => [
      b.id,
      b.bookingDate,
      b.tourType,
      b.client,
      b.destination,
      b.travelDate,
      b.returnDate,
      b.pax,
      b.salesRep,
      b.status,
      calculateTripDurationDays(b.travelDate, b.returnDate),
      getMonthString(b.travelDate),
      b.status !== config.excludedBookingStatus ? 1 : 0,
    ]);
    exportArrayToCSV(headers, rows, '02_Booking_Register_Export.csv');
  };

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-[#E8E8E6] pb-4">
        <div>
          <span className="text-xs uppercase font-semibold text-[#888888] tracking-label">
            Module 02 • Tour Booking Register
          </span>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-[#051C2C] tracking-display mt-0.5">
            Bookings Ledger & Master Key Generator
          </h1>
          <p className="text-xs text-[#888888] mt-1">
            Primary registry generating unique Booking IDs. Yellow cells indicate editable raw fields; gray columns represent auto-computed properties.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAddingNew(true)}
            className="px-4 py-1.5 rounded-lg text-xs font-semibold text-white bg-[#2251FF] hover:bg-[#1a41cc] flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>New Booking</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="px-3 py-1.5 rounded-lg border border-[#E8E8E6] bg-white text-xs font-semibold text-[#051C2C] hover:bg-[#F5F5F2] flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <Download className="w-3.5 h-3.5 text-[#2251FF]" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* New Booking Form Drawer / Card */}
      {isAddingNew && (
        <form
          onSubmit={handleCreateSubmit}
          className="card-surface-static p-5 bg-white border border-[#2251FF]/30 space-y-4"
        >
          <div className="flex items-center justify-between border-b border-[#E8E8E6] pb-2">
            <h3 className="font-heading text-base font-bold text-[#051C2C]">
              Register New B2B Booking
            </h3>
            <button
              type="button"
              onClick={() => setIsAddingNew(false)}
              className="text-xs text-[#888888] hover:text-[#051C2C]"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            <div>
              <label className="block text-[11px] font-semibold text-[#051C2C] uppercase tracking-label mb-1">
                Booking ID *
              </label>
              <input
                type="text"
                required
                value={newBooking.id || ''}
                onChange={(e) =>
                  setNewBooking({ ...newBooking, id: e.target.value.trim() })
                }
                className="w-full p-2 rounded border border-[#E8E8E6] font-mono input-editable"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#051C2C] uppercase tracking-label mb-1">
                Registration Date
              </label>
              <input
                type="date"
                required
                value={newBooking.bookingDate || ''}
                onChange={(e) =>
                  setNewBooking({ ...newBooking, bookingDate: e.target.value })
                }
                className="w-full p-2 rounded border border-[#E8E8E6] input-editable"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#051C2C] uppercase tracking-label mb-1">
                Tour Type
              </label>
              <select
                value={newBooking.tourType}
                onChange={(e) =>
                  setNewBooking({ ...newBooking, tourType: e.target.value as TourType })
                }
                className="w-full p-2 rounded border border-[#E8E8E6] input-editable"
              >
                {config.tourTypes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#051C2C] uppercase tracking-label mb-1">
                B2B Client
              </label>
              <select
                value={newBooking.client}
                onChange={(e) =>
                  setNewBooking({ ...newBooking, client: e.target.value })
                }
                className="w-full p-2 rounded border border-[#E8E8E6] input-editable"
              >
                {config.b2bClients.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#051C2C] uppercase tracking-label mb-1">
                Destination Route
              </label>
              <select
                value={newBooking.destination}
                onChange={(e) =>
                  setNewBooking({ ...newBooking, destination: e.target.value })
                }
                className="w-full p-2 rounded border border-[#E8E8E6] input-editable"
              >
                {config.destinations.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#051C2C] uppercase tracking-label mb-1">
                Travel Start Date
              </label>
              <input
                type="date"
                required
                value={newBooking.travelDate || ''}
                onChange={(e) =>
                  setNewBooking({ ...newBooking, travelDate: e.target.value })
                }
                className="w-full p-2 rounded border border-[#E8E8E6] input-editable"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#051C2C] uppercase tracking-label mb-1">
                Return Date
              </label>
              <input
                type="date"
                required
                value={newBooking.returnDate || ''}
                onChange={(e) =>
                  setNewBooking({ ...newBooking, returnDate: e.target.value })
                }
                className="w-full p-2 rounded border border-[#E8E8E6] input-editable"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#051C2C] uppercase tracking-label mb-1">
                PAX Count
              </label>
              <input
                type="number"
                min="1"
                required
                value={newBooking.pax || 1}
                onChange={(e) =>
                  setNewBooking({
                    ...newBooking,
                    pax: parseInt(e.target.value, 10) || 1,
                  })
                }
                className="w-full p-2 rounded border border-[#E8E8E6] font-mono input-editable"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#051C2C] uppercase tracking-label mb-1">
                Sales Rep
              </label>
              <select
                value={newBooking.salesRep}
                onChange={(e) =>
                  setNewBooking({ ...newBooking, salesRep: e.target.value })
                }
                className="w-full p-2 rounded border border-[#E8E8E6] input-editable"
              >
                {config.salesReps.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#051C2C] uppercase tracking-label mb-1">
                Booking Status
              </label>
              <select
                value={newBooking.status}
                onChange={(e) =>
                  setNewBooking({
                    ...newBooking,
                    status: e.target.value as BookingStatus,
                  })
                }
                className="w-full p-2 rounded border border-[#E8E8E6] input-editable"
              >
                {config.bookingStatuses.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-[11px] font-semibold text-[#051C2C] uppercase tracking-label mb-1">
                Internal Remarks & Package Details
              </label>
              <input
                type="text"
                value={newBooking.notes || ''}
                onChange={(e) =>
                  setNewBooking({ ...newBooking, notes: e.target.value })
                }
                placeholder="Optional itinerary or flight details..."
                className="w-full p-2 rounded border border-[#E8E8E6] input-editable"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsAddingNew(false)}
              className="px-4 py-2 rounded-lg text-xs font-medium text-[#051C2C] hover:bg-[#F5F5F2]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg text-xs font-semibold text-white bg-[#2251FF] hover:bg-[#1a41cc] shadow-sm"
            >
              Save Booking to Ledger
            </button>
          </div>
        </form>
      )}

      {/* Search Toolbar */}
      <div className="card-surface-static p-4 bg-white flex items-center justify-between gap-3 text-xs">
        <div className="relative flex-1 max-w-md">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#888888]" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search booking ID, client, destination, or rep..."
            className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-[#E8E8E6] text-xs input-editable"
          />
        </div>
        <div className="text-[11px] text-[#888888] font-mono">
          Total: <strong>{bookings.length}</strong> bookings registered
        </div>
      </div>

      {/* Main Table */}
      <div className="card-surface-static bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[1300px]">
            <thead className="bg-[#051C2C]/5 text-[11px] font-semibold text-[#051C2C] uppercase tracking-label border-b border-[#051C2C]/10">
              <tr>
                <th className="py-2.5 px-3">Booking ID</th>
                <th className="py-2.5 px-3">Reg Date</th>
                <th className="py-2.5 px-3">Type</th>
                <th className="py-2.5 px-3 min-w-[180px]">B2B Client Name</th>
                <th className="py-2.5 px-3 min-w-[180px]">Destination Route</th>
                <th className="py-2.5 px-3">Travel Date</th>
                <th className="py-2.5 px-3">Return Date</th>
                <th className="py-2.5 px-3 text-right">PAX</th>
                <th className="py-2.5 px-3">Sales Rep</th>
                <th className="py-2.5 px-3 text-center">Status</th>
                <th className="py-2.5 px-3 text-center bg-[#F5F5F2]">Days</th>
                <th className="py-2.5 px-3 text-center bg-[#F5F5F2]">Travel Month</th>
                <th className="py-2.5 px-3 text-center bg-[#F5F5F2]">Active?</th>
                <th className="py-2.5 px-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E8E6]">
              {filteredBookings.map((b) => {
                const durationDays = calculateTripDurationDays(b.travelDate, b.returnDate);
                const travelMonth = getMonthString(b.travelDate);
                const isActive = b.status !== config.excludedBookingStatus;
                const isDuplicate = (idCounts.get(b.id) || 0) > 1;

                return (
                  <tr key={b.id} className="hover:bg-[#F5F5F2] transition-colors">
                    {/* Booking ID */}
                    <td className="py-2 px-3 font-mono font-medium">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[#051C2C]">{b.id}</span>
                        {isDuplicate && (
                          <span
                            title="Duplicate ID warning! Multiple orders share this ID"
                            className="text-[#D32F2F]"
                          >
                            <AlertTriangle className="w-3.5 h-3.5" />
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Booking Date */}
                    <td className="py-2 px-3">
                      <input
                        type="date"
                        value={b.bookingDate}
                        onChange={(e) =>
                          onUpdateBooking(b.id, { bookingDate: e.target.value })
                        }
                        className="p-1 rounded text-xs input-editable w-[110px]"
                      />
                    </td>

                    {/* Tour Type */}
                    <td className="py-2 px-3">
                      <select
                        value={b.tourType}
                        onChange={(e) =>
                          onUpdateBooking(b.id, { tourType: e.target.value as TourType })
                        }
                        className="p-1 rounded text-xs input-editable"
                      >
                        {config.tourTypes.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </td>

                    {/* Client */}
                    <td className="py-2 px-3">
                      <select
                        value={b.client}
                        onChange={(e) =>
                          onUpdateBooking(b.id, { client: e.target.value })
                        }
                        className="p-1 rounded text-xs input-editable w-full max-w-[200px]"
                      >
                        {config.b2bClients.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </td>

                    {/* Destination */}
                    <td className="py-2 px-3">
                      <select
                        value={b.destination}
                        onChange={(e) =>
                          onUpdateBooking(b.id, { destination: e.target.value })
                        }
                        className="p-1 rounded text-xs input-editable w-full max-w-[200px]"
                      >
                        {config.destinations.map((d) => (
                          <option key={d} value={d}>
                            {d}
                          </option>
                        ))}
                      </select>
                    </td>

                    {/* Travel Date */}
                    <td className="py-2 px-3">
                      <input
                        type="date"
                        value={b.travelDate}
                        onChange={(e) =>
                          onUpdateBooking(b.id, { travelDate: e.target.value })
                        }
                        className="p-1 rounded text-xs input-editable w-[110px]"
                      />
                    </td>

                    {/* Return Date */}
                    <td className="py-2 px-3">
                      <input
                        type="date"
                        value={b.returnDate}
                        onChange={(e) =>
                          onUpdateBooking(b.id, { returnDate: e.target.value })
                        }
                        className="p-1 rounded text-xs input-editable w-[110px]"
                      />
                    </td>

                    {/* PAX */}
                    <td className="py-2 px-3 text-right">
                      <input
                        type="number"
                        min="1"
                        value={b.pax}
                        onChange={(e) =>
                          onUpdateBooking(b.id, {
                            pax: parseInt(e.target.value, 10) || 1,
                          })
                        }
                        className="p-1 rounded text-xs font-mono text-right input-editable w-[60px]"
                      />
                    </td>

                    {/* Sales Rep */}
                    <td className="py-2 px-3">
                      <select
                        value={b.salesRep}
                        onChange={(e) =>
                          onUpdateBooking(b.id, { salesRep: e.target.value })
                        }
                        className="p-1 rounded text-xs input-editable"
                      >
                        {config.salesReps.map((r) => (
                          <option key={r} value={r}>
                            {r}
                          </option>
                        ))}
                      </select>
                    </td>

                    {/* Status */}
                    <td className="py-2 px-3 text-center">
                      <select
                        value={b.status}
                        onChange={(e) =>
                          onUpdateBooking(b.id, {
                            status: e.target.value as BookingStatus,
                          })
                        }
                        className="p-1 rounded text-xs input-editable font-medium"
                      >
                        {config.bookingStatuses.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </td>

                    {/* Auto: Trip Duration Days */}
                    <td className="py-2 px-3 text-center font-mono bg-[#F5F5F2] font-medium text-[#051C2C]">
                      {durationDays}d
                    </td>

                    {/* Auto: Travel Month */}
                    <td className="py-2 px-3 text-center font-mono bg-[#F5F5F2] text-[#888888]">
                      {travelMonth}
                    </td>

                    {/* Auto: Is Active */}
                    <td className="py-2 px-3 text-center bg-[#F5F5F2]">
                      <span
                        className={`inline-block w-2.5 h-2.5 rounded-full ${
                          isActive ? 'bg-[#00C853]' : 'bg-[#D32F2F]'
                        }`}
                        title={isActive ? 'Active in Profit Calculations' : 'Cancelled / Excluded'}
                      />
                    </td>

                    {/* Actions */}
                    <td className="py-2 px-3 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => onSelectBooking(b.id)}
                          className="p-1 text-[#2251FF] hover:bg-[rgba(34,81,255,0.08)] rounded"
                          title="View Financial Dossier"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onDeleteBooking(b.id)}
                          className="p-1 text-[#888888] hover:text-[#D32F2F] hover:bg-[rgba(211,47,47,0.08)] rounded"
                          title="Delete Booking"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
