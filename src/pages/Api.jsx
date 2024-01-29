import NavbarDefault from '../components/NavbarDefault';
import { SERVER_URI } from "../env";


function Api(){
    return (
        <>
        <NavbarDefault />
        <div className="container">
            <div className="card card-body mt-5">
            <div className="row">
                <div className="col-12 text-center">
                    <h3 className="text-muted mb-0">API Preview</h3>
                    <hr className="text-muted mt-2" />
                </div>
                <div className="col-12 mb-4">
                    <h5 className="text-muted">Get All Data <span className="badge bg-warning">GET</span></h5>
                    <div className="bg-light rounded p-3">{SERVER_URI}/api/get_all</div>
                </div>
                <div className="col-12 mb-4">
                    <h5 className="text-muted">Get Data by ID <span className="badge bg-info">GET</span></h5>
                    <div className="bg-light rounded p-3">{SERVER_URI}/api/get/1</div>
                </div>
                <div className="col-12">
                    <h5 className="text-muted">Delete Data by ID <span className="badge bg-danger">DELETE</span></h5>
                    <div className="bg-light rounded p-3">{SERVER_URI}/api/delete/1</div>
                </div>
            </div>
            </div>
        </div>
        </>
    );
}

export default Api;