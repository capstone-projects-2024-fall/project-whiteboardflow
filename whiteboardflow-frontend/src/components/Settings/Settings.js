import React, {useState} from 'react';
import './Settings.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const AccountSettings = () => {
    const [activeTab, setActiveTab] = useState('account-general');
    const handleTabChange = (tab) => setActiveTab(tab);
    const handleResendConfirmation = () => {
        console.log('Resend confirmation clicked');
    };

    return (
        <div className="container light-style flex-grow-1 container-p-y">
            <h4 className="font-weight-bold py-3 mb-4">Account settings</h4>
            <div className="card overflow-hidden">
                <div className="row no-gutters row-bordered row-border-light">
                    <div className="col-md-3 pt-0">
                        <div className="list-group list-group-flush account-settings-links">
                            <button
                                className={`list-group-item list-group-item-action ${activeTab === 'account-general' ? 'active' : ''}`}
                                onClick={() => handleTabChange('account-general')}
                            >
                                General
                            </button>
                            <button
                                className={`list-group-item list-group-item-action ${activeTab === 'account-change-password' ? 'active' : ''}`}
                                onClick={() => handleTabChange('account-change-password')}
                            >
                                Change password
                            </button>
                            <button
                                className={`list-group-item list-group-item-action ${activeTab === 'personalize' ? 'active' : ''}`}
                                onClick={() => handleTabChange('personalize')}
                            >
                                Personalize
                            </button>
                            <button
                                className={`list-group-item list-group-item-action ${activeTab === 'account-connections' ? 'active' : ''}`}
                                onClick={() => handleTabChange('account-connections')}
                            >
                                Connections
                            </button>
                        </div>
                    </div>
                    <div className="col-md-9">
                        <div className="tab-content">
                            {/* General Tab */}
                            {activeTab === 'account-general' && (
                                <div className="tab-pane fade active show" id="account-general">
                                    <div className="card-body media align-items-center">
                                        <img src="/user_image.jpg" alt="avatar" className="d-block ui-w-80"/>
                                        <div className="media-body ml-4">
                                            <label className="btn btn-outline-primary">
                                                Upload new photo
                                                <input type="file" className="account-settings-fileinput"/>
                                            </label>
                                            &nbsp;
                                            <button type="button" className="btn btn-default md-btn-flat">Reset</button>
                                            <div className="text-light small mt-1">Allowed JPG, GIF or PNG. Max size of
                                                800K
                                            </div>
                                        </div>
                                    </div>
                                    <hr className="border-light m-0"/>
                                    <div className="card-body">
                                        <div className="form-group">
                                            <label className="form-label">Username</label>
                                            <input type="text" className="form-control mb-1"/>
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Name</label>
                                            <input type="text" className="form-control"/>
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">E-mail</label>
                                            <input type="text" className="form-control mb-1"/>
                                            {/*<div className="alert alert-warning mt-3">*/}
                                            {/*    Your email is not confirmed. Please check your inbox.*/}
                                            {/*    <br />*/}
                                            {/*    <button className="btn btn-link p-0" onClick={handleResendConfirmation}>*/}
                                            {/*        Resend confirmation*/}
                                            {/*    </button>                                            </div>*/}
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Company</label>
                                            <input type="text" className="form-control"/>
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Bio</label>
                                            <textarea className="form-control" rows="5"></textarea>
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Country</label><br/>
                                            <select className="custom-select">
                                                <option>Canada</option>
                                                <option>USA</option>
                                                <option>UK</option>
                                                <option>Germany</option>
                                                <option>France</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Change Password Tab */}
                            {activeTab === 'account-change-password' && (
                                <div className="tab-pane active show" id="account-change-password">
                                    <div className="card-body pb-2">
                                        <div className="form-group">
                                            <label className="form-label">Current password</label>
                                            <input type="password" className="form-control"/>
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">New password</label>
                                            <input type="password" className="form-control"/>
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Repeat new password</label>
                                            <input type="password" className="form-control"/>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Personalize */}
                            {activeTab === 'account-social-links' && (
                                <div className="tab-pane active show" id="account-social-links">
                                    <div className="card-body pb-2">
                                        <div className="form-group">
                                            <label className="form-label">Twitter</label>
                                            <input type="text" className="form-control"/>
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Facebook</label>
                                            <input type="text" className="form-control"/>
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Github</label>
                                            <input type="text" className="form-control"/>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Connections */}
                            {activeTab === 'account-connections' && (
                                <div className="tab-pane active show" id="account-connections">
                                    <div className="card-body">
                                        <h5 className="mb-2">
                                            <a href="javascript:void(0)" className="float-right text-muted text-tiny"><i
                                                className="ion ion-md-close"></i> Remove</a>
                                            <i className="ion ion-logo-google text-google"></i>
                                            You are connected to Google:
                                        </h5>
                                        whiteboard.a@temple.edu
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-right mt-3">
                <button type="button" className="btn btn-primary">Save changes</button>
                &nbsp;
                <button type="button" className="btn btn-default">Cancel</button>
            </div>
        </div>
    );
};

export default AccountSettings;
