import {useState} from 'react'
import Navbar from '../navbar';
import './style.css';

function PostProperty() {

   const [type, setType] = useState("Buy");

   if(type == "Buy"){
    return (
        <div>
            <Navbar />
            <div className='container ipclass'>
                <form>
                    <div>   
                        <input type="radio" className="btn-check" name="options-outlined" id="buying" autocomplete="off" checked onClick={() => setType("Buy")}/>
                        <label className="btn btn-outline-primary me-2" htmlFor="buying">SALE</label>

                        <input type="radio" className="btn-check" name="options-outlined" id="renting" autocomplete="off" onClick={() => setType("Rent")}/>
                        <label className="btn btn-outline-primary" htmlFor="renting">RENT</label>
                    </div>
                    <br />
                    <div className="input-group input-group-lg mb-2">
                        <span className="input-group-text" >Location</span>
                        <input type="text" className="form-control"/>
                    </div>
                    <div className="input-group input-group-lg mb-3">
                        <label className="input-group-text">Property Type</label>
                        <select className="form-select">
                            <option selected>Choose...</option>
                            <option value="Full House">Full House</option>
                            <option value="PG/Hostel">PG/Hostel</option>
                            <option value="Condos">Condos</option>
                            <option value="Restaurants">Restaurants</option>
                            <option value="Offices">Offices</option>
                            <option value="Shopping Complex">Shopping Complex</option>
                        </select>
                    </div>
                    <div className="form-floating mb-2">
                        <input type="number" className="form-control" id="floatingTextarea" placeholder="Caost" />
                        <label htmlFor="floatingTextarea">Coast</label>
                    </div>      
                    <div className="form-floating">
                        <input type="number" className="form-control" id="floatingTextarea" placeholder='Emi'/>
                        <label htmlFor="floatingTextarea">EMI</label>
                    </div>
                    <br />
                    <div className="col-auto">
                        <button type="submit" className="btn btn-primary">POST</button>
                    </div>
                </form>
            </div>
        </div>
    )
   }
   else if(type == "Rent"){
    return(
        <div>
            <Navbar />
            <div className='container'>
            <form>
                <div>   
                    <input type="radio" className="btn-check" name="options-outlined" id="buying" autocomplete="off" onClick={() => setType("Buy")}/>
                    <label className="btn btn-outline-primary me-2" htmlFor="buying">SALE</label>

                    <input type="radio" className="btn-check" name="options-outlined" id="renting" autocomplete="off" onClick={() => setType("Rent")}/>
                    <label className="btn btn-outline-primary" htmlFor="renting">RENT</label>
                </div>
                <br />
                <div className="input-group input-group-lg mb-2">
                    <span className="input-group-text" >Location</span>
                    <input type="text" className="form-control"/>
                </div>
                <div className="input-group input-group-lg mb-3">
                    <label className="input-group-text">Property Type</label>
                    <select className="form-select">
                        <option selected>Choose...</option>
                        <option value="Full House">Full House</option>
                        <option value="PG/Hostel">PG/Hostel</option>
                        <option value="Condos">Condos</option>
                        <option value="Restaurants">Restaurants</option>
                        <option value="Offices">Offices</option>
                        <option value="Shopping Complex">Shopping Complex</option>
                    </select>
                </div>
                <div className="form-floating mb-2">
                    <input type="number" className="form-control" id="floatingTextarea" placeholder='Rent' />
                    <label htmlFor="floatingTextarea">Rent</label>
                </div>
                <div className="form-floating">
                    <input type="number" className="form-control" id="floatingTextarea" placeholder='Deposit'/>
                    <label htmlFor="floatingTextarea">Deposit</label>
                </div>
                <br />
                <div className="col-auto">
                    <button type="submit" className="btn btn-primary">POST</button>
                </div>
            </form>
            </div>
        </div>
    )
   }
}

export default PostProperty