/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { ProgressBar } from 'primereact/progressbar';
import { Calendar } from 'primereact/calendar';
import { MultiSelect } from 'primereact/multiselect';
import { Slider } from 'primereact/slider';
import './DataTableDemo.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';

export default function StockNew({ stocklist }) {
  const [customers, setCustomers] = useState(stocklist);
  const [selectedCustomers, setSelectedCustomers] = useState(null);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    'country.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    representative: { value: null, matchMode: FilterMatchMode.IN },
    date: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
    balance: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
    status: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
    activity: { value: null, matchMode: FilterMatchMode.BETWEEN }
  });
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setCustomers(stocklist);
    setLoading(false);
  }, []);

  const formatDate = (value) => value.toLocaleDateString('en-US', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  const formatCurrency = (value) => value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

  const onGlobalFilterChange = (e) => {
    const { value } = e.target;
    const _filters = { ...filters };
    _filters.global.value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const renderHeader = () => (
    <div className="flex justify-content-between align-items-center">
      <h5 className="m-0">Stock Listing</h5>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
      </span>
    </div>
  );
  const dateBodyTemplate = (rowData) => formatDate(rowData.date);

  const dateFilterTemplate = (options) => <Calendar value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)} dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy" mask="99/99/9999" />;

  const balanceBodyTemplate = (rowData) => formatCurrency(rowData.balance);

  const balanceFilterTemplate = (options) => <InputNumber value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)} mode="currency" currency="USD" locale="en-US" />;

  const statusBodyTemplate = (rowData) => <span className={`customer-badge status-${rowData.status}`}>{rowData.status}</span>;

  const activityBodyTemplate = (rowData) => <ProgressBar value={rowData.activity} showValue={false} />;

  const activityFilterTemplate = (options) => (
    <>
      <Slider value={options.value} onChange={(e) => options.filterCallback(e.value)} range className="m-3" />
      <div className="flex align-items-center justify-content-between px-2">
        <span>{options.value ? options.value[0] : 0}</span>
        <span>{options.value ? options.value[1] : 100}</span>
      </div>
    </>
  );

  const actionBodyTemplate = () => <Button type="button" icon="pi pi-cog" />;

  const header = renderHeader();
  return (
    <div className="datatable-doc-demo">
      <div className="card">
        <DataTable
          value={stocklist}
          paginator
          className="p-datatable-customers"
          header={header}
          rows={10}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          rowsPerPageOptions={[10, 25, 50]}
          dataKey="id"
          rowHover
          selection={selectedCustomers}
          onSelectionChange={(e) => setSelectedCustomers(e.value)}
          filters={filters}
          filterDisplay="menu"
          loading={loading}
          responsiveLayout="scroll"
          globalFilterFields={['name', 'country.name', 'representative.name', 'balance', 'status']}
          emptyMessage="No customers found."
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
         
        >
          <Column
            field="date"
            header="Date"
            sortable
            filterField="date"
            dataType="date"
            style={{ minWidth: '8rem' }}
            filter
          />
          <Column field="stock_id" header="Stock" sortable filter filterPlaceholder="Search by name" style={{ minWidth: '14rem' }} />
          <Column field="stock_symbol" header="Symbol" sortable filterField="stock_symbol" style={{ minWidth: '14rem' }} filter filterPlaceholder="Search by symbol" />
          <Column field="source" header="Symbol" sortable filterField="stock_symbol" style={{ minWidth: '14rem' }} filter filterPlaceholder="Search by symbol" />
          <Column field="recommendation" header="Balance" sortable dataType="numeric" style={{ minWidth: '8rem' }} filter filterElement={balanceFilterTemplate} />
          <Column field="price_today" header="Status" sortable filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '10rem' }} body={statusBodyTemplate} filter />
          <Column field="price_target" header="Activity" sortable showFilterMatchModes={false} style={{ minWidth: '10rem' }} body={activityBodyTemplate} filter filterElement={activityFilterTemplate} />
          <Column field="price_after_earning" header="Symbol" sortable filterField="stock_symbol" style={{ minWidth: '14rem' }} filter filterPlaceholder="Search by symbol" />
          <Column field="news" header="Symbol" sortable filterField="stock_symbol" style={{ minWidth: '14rem' }} filter filterPlaceholder="Search by symbol" />
          <Column field="technical_indicator" header="Symbol" sortable filterField="stock_symbol" style={{ minWidth: '14rem' }} filter filterPlaceholder="Search by symbol" />
          <Column field="descriptions" header="Symbol" sortable filterField="stock_symbol" style={{ minWidth: '14rem' }} filter filterPlaceholder="Search by symbol" />
          <Column field="comments" header="Symbol" sortable filterField="stock_symbol" style={{ minWidth: '14rem' }} filter filterPlaceholder="Search by symbol" />
          <Column field="ranking" header="Symbol" sortable filterField="stock_symbol" style={{ minWidth: '14rem' }} filter filterPlaceholder="Search by symbol" />
          <Column field="earning_reports_source" header="Symbol" sortable filterField="stock_symbol" style={{ minWidth: '14rem' }} filter filterPlaceholder="Search by symbol" />
          <Column field="before_open_close" header="Symbol" sortable filterField="stock_symbol" style={{ minWidth: '14rem' }} filter filterPlaceholder="Search by symbol" />
          <Column field="est_eps" header="Symbol" sortable filterField="stock_symbol" style={{ minWidth: '14rem' }} filter filterPlaceholder="Search by symbol" />
          <Column field="a_eps" header="Symbol" sortable filterField="stock_symbol" style={{ minWidth: '14rem' }} filter filterPlaceholder="Search by symbol" />
          <Column field="est_rev" header="Symbol" sortable filterField="stock_symbol" style={{ minWidth: '14rem' }} filter filterPlaceholder="Search by symbol" />
          <Column field="a_rev" header="Symbol" sortable filterField="stock_symbol" style={{ minWidth: '14rem' }} filter filterPlaceholder="Search by symbol" />
          <Column field="exp_revenue_growth_per" header="Symbol" sortable filterField="stock_symbol" style={{ minWidth: '14rem' }} filter filterPlaceholder="Search by symbol" />
          <Column field="a_rg_per" header="Symbol" sortable filterField="stock_symbol" style={{ minWidth: '14rem' }} filter filterPlaceholder="Search by symbol" />
          <Column field="max_surprise_per" header="Symbol" sortable filterField="stock_symbol" style={{ minWidth: '14rem' }} filter filterPlaceholder="Search by symbol" />
          <Column headerStyle={{ width: '4rem', textAlign: 'center' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} body={actionBodyTemplate} />
        </DataTable>
      </div>
    </div>
  );
} 
