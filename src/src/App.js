import logo from './images/logo_multisearch.png'
import './index.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import React, { useState,} from 'react';
import {FiSearch}from 'react-icons/fi'


function App() {
    const [searchText, setSearchText] = useState('');
    const [salesData, setSalesData] = useState([]);
    const [purchaseData, setPurchaseData] = useState([]);
    const [equipmentsData, setEquipmentsData] = useState([]);
    const [workforceData, setWorkforceData] = useState([]);
    const [materialsData, setmaterialsData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const handleSearch = async () => {
      setIsLoading(true);
      setError(null);
      if(searchText === '') return;
      try {
        const salesResponse = await fetch(`http://localhost:3333/salesOrders?text=${searchText}`);
        const purchaseResponse = await fetch(`http://localhost:3333/purchaseOrders?text=${searchText}`);
        const workforceResponse = await fetch(`http://localhost:3333/workforce?text=${searchText}`);
        const equipmentsResponse = await fetch(`http://localhost:3333/equipments?text=${searchText}`);
        const materialsResponse = await fetch(`http://localhost:3333/materials?text=${searchText}`);
        const salesData = await salesResponse.json();
        const purchaseData = await purchaseResponse.json();
        const equipmentsData = await equipmentsResponse.json();
        const workforceData = await workforceResponse.json();
        const materialsData = await materialsResponse.json();

        

        if (salesData.length === 0 && purchaseData.length === 0 && equipmentsData.length === 0 && workforceData.length === 0) {
            setError('No data found');
          } else {
            setSalesData(salesData);
            setPurchaseData(purchaseData);
            setEquipmentsData(equipmentsData);
            setWorkforceData(workforceData);
            setmaterialsData(materialsData)
          }
        } catch (err) {
          setError(err);
        }
        setIsLoading(false);
      };
    
    return (
      <form>
        <div className="container">
          <img src={logo} alt="Logo" />
          <div className='search-container'>
          <input 
            className="containerInput input"
            type="text"
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
          />
          <button className='buttonSearch' type="button" onClick={handleSearch}>
          <FiSearch size='25' color='black'/></button> 
          </div> 
          {isLoading ? (
            <div className="loading">Loading...</div>
            ) : error ?(
            <div className="error">{error.message}</div>
          ) : (
            <>
              {error && <div className="error">{error.message}</div>}
              <SalesCard data={salesData} />
              <PurchaseCard data={purchaseData} />
              <EquipmentsCard data={equipmentsData}/>
              <WorkforceCard data={workforceData}/>
              <MaterialsCard data={materialsData}/>
            </>
          )}
        </div>
      </form>
    );
    }
    function SalesCard({ data }) {
        if (data.length === 0) {
            return null;
          }
    return (
    <div className="card">
    <div className="card-header">Pedidos de Venda</div>
    <div className="card-body">
    <ul style={{listStyleType: "none"}}>
    { data.map(result => (
    <li key={result.id}>
    <span className="redText">#{result.SalesOrderID}</span> {result.MaterialName} Qtd: {result.Quantity}
    </li>
    ))}
    </ul>
    </div>
    </div>
    )
    }
    
    function PurchaseCard({ data }) {
        if (data.length === 0) {
            return null;
          }
    return (
    <div className="card">
    <div className="card-header">Equipamentos</div>
    
    <div className="card-body">
    <ul style={{listStyleType: "none"}}>
    { data.map(result => (
    <li key={result.MaterialName}>
    <span className="redText">#{result.PurchaseOrderID}</span> {result.MaterialName} Qtd: {result.Quantity}
    </li>
    ))}
    </ul>
    </div>
    </div>
    )
    }

    function EquipmentsCard({ data }) {
        if (data.length === 0) {
            return null;
          }
        return (
        <div className="card">
        <div className="card-header">Equipamentos</div>
        
        <div className="card-body">
        <ul style={{listStyleType: "none"}}>
        { data.map(result => (
        <li key={result.EquipmentName}>
        <span className="redText">#{result.EquipmentID}</span> {result.EquipmentName} 
        </li>
        ))}
        </ul>
        </div>
        </div>
        )
        }

        function WorkforceCard({ data }) {
            if (data.length === 0) {
                return null;
              }
            return (
            <div className="card">
            <div className="card-header">Mão de Obra </div>
            
            <div className="card-body">
            <ul style={{listStyleType: "none"}}>
            { data.map(result => (
            <li key={result.Name}>
            <span className="redText">#{result.Workforceid}</span>{result.Name}  {result.Shift} 
            </li>
            ))}
            </ul>
            </div>
            </div>
            )
            }

            function MaterialsCard({ data }) {
                if (data.length === 0) {
                    return null;
                  }
                return (
                <div className="card">
                <div className="card-header">Materiais</div>
                
                <div className="card-body">
                <ul style={{listStyleType: "none"}}>
                { data.map(result => (
                <li key={result.MaterialName}>
                <span className="redText">#{result.MaterialID}</span>{result.MaterialName}  
                </li>
                ))}
                </ul>
                </div>
                </div>
                )
                }

    export default App;