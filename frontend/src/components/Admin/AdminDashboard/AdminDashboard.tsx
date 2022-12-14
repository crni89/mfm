import React from "react";
import { faPlusSquare } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
    return (
        <div className="row">
            <div className="col-12 col-lg-4 col-md-6 col-xl-3 p-3">
                <div className="card">
                    <div className="card-body">
                        <div className="card-title">
                            <h2 className="h5">Objekti</h2>
                        </div>
                        <div className="btn-group w-100">
                            <Link className="btn btn-primary" to="/admin/dashboard/obejkat/lista">Pregled objekata</Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-12 col-lg-4 col-md-6 col-xl-3 p-3">
                <div className="card">
                    <div className="card-body">
                        <div className="card-title">
                            <h2 className="h5">Grupe</h2>
                        </div>
                        <div className="btn-group w-100">
                            <Link className="btn btn-primary" to="/admin/dashboard/grupa/lista">Pregled grupa</Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-12 col-lg-4 col-md-6 col-xl-3 p-3">
                <div className="card">
                    <div className="card-body">
                        <div className="card-title">
                            <h2 className="h5">Ugovori</h2>
                        </div>
                        <div className="btn-group w-100">
                            <Link className="btn btn-primary" to="/admin/dashboard/ugovor/lista">Pregled ugovora</Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-12 col-lg-4 col-md-6 col-xl-3 p-3">
                <div className="card">
                    <div className="card-body">
                        <div className="card-title">
                            <h2 className="h5">Deca</h2>
                        </div>
                        <div className="card-text btn-group w-100">
                            <Link className="btn btn-primary" to="/admin/dashboard/deca/list">Lista dece</Link>
                            <Link className="btn btn-success" to="/admin/dashboard/dete/dodaj">
                                <FontAwesomeIcon icon={ faPlusSquare } /> Dodaj
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-12 col-lg-4 col-md-6 col-xl-3 p-3">
                <div className="card">
                    <div className="card-body">
                        <div className="card-title">
                            <h2 className="h5">Roditelji</h2>
                        </div>
                        <div className="card-text btn-group w-100">
                            <Link className="btn btn-primary" to="/admin/dashboard/roditelj/list">Lista roditelja</Link>
                            <Link className="btn btn-success" to="/admin/dashboard/roditelj/dodaj">
                                <FontAwesomeIcon icon={ faPlusSquare } /> Dodaj
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-12 col-lg-4 col-md-6 col-xl-3 p-3">
                <div className="card">
                    <div className="card-body">
                        <div className="card-title">
                            <h2 className="h5">Administratori</h2>
                        </div>
                        <div className="card-text">
                            <div className="btn-group w-100">
                                <Link className="btn btn-primary" to="/admin/dashboard/administrator/list">Lista administratora</Link>
                                <Link className="btn btn-success" to="/admin/dashboard/administrator/add">
                                    <FontAwesomeIcon icon={ faPlusSquare } /> Dodaj
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
