import React, { useState } from 'react';
import './Settings.css';

const AccountSettings = () => {
    const [activeTab, setActiveTab] = useState('account-general');
    const handleTabChange = (tab) => setActiveTab(tab);
    const handleResendConfirmation = () => {
        // Add your logic to resend the confirmation email here
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
                                className={`list-group-item list-group-item-action ${activeTab === 'account-info' ? 'active' : ''}`}
                                onClick={() => handleTabChange('account-info')}
                            >
                                Info
                            </button>
                            <button
                                className={`list-group-item list-group-item-action ${activeTab === 'account-social-links' ? 'active' : ''}`}
                                onClick={() => handleTabChange('account-social-links')}
                            >
                                Social links
                            </button>
                            <button
                                className={`list-group-item list-group-item-action ${activeTab === 'account-connections' ? 'active' : ''}`}
                                onClick={() => handleTabChange('account-connections')}
                            >
                                Connections
                            </button>
                            <button
                                className={`list-group-item list-group-item-action ${activeTab === 'account-notifications' ? 'active' : ''}`}
                                onClick={() => handleTabChange('account-notifications')}
                            >
                                Notifications
                            </button>
                        </div>
                    </div>
                    <div className="col-md-9">
                        <div className="tab-content">
                            {/* General Tab */}
                            {activeTab === 'account-general' && (
                                <div className="tab-pane fade active show" id="account-general">
                                    <div className="card-body media align-items-center">
                                        <img src="/user_image.jpg" alt="avatar" className="d-block ui-w-80" />
                                        <div className="media-body ml-4">
                                            <label className="btn btn-outline-primary">
                                                Upload new photo
                                                <input type="file" className="account-settings-fileinput" />
                                            </label>
                                            &nbsp;
                                            <button type="button" className="btn btn-default md-btn-flat">Reset</button>
                                            <div className="text-light small mt-1">Allowed JPG, GIF or PNG. Max size of 800K</div>
                                        </div>
                                    </div>
                                    <hr className="border-light m-0" />
                                    <div className="card-body">
                                        <div className="form-group">
                                            <label className="form-label">Username</label>
                                            <input type="text" className="form-control mb-1" defaultValue="nmaxwell" />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Name</label>
                                            <input type="text" className="form-control" defaultValue="Nelle Maxwell" />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">E-mail</label>
                                            <input type="text" className="form-control mb-1" defaultValue="nmaxwell@mail.com" />
                                            <div className="alert alert-warning mt-3">
                                                Your email is not confirmed. Please check your inbox.
                                                <br />
                                                <button className="btn btn-link p-0" onClick={handleResendConfirmation}>
                                                    Resend confirmation
                                                </button>                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Company</label>
                                            <input type="text" className="form-control" defaultValue="Company Ltd." />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Change Password Tab */}
                            {activeTab === 'account-change-password' && (
                                <div className="tab-pane fade" id="account-change-password">
                                    <div className="card-body pb-2">
                                        <div className="form-group">
                                            <label className="form-label">Current password</label>
                                            <input type="password" className="form-control" />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">New password</label>
                                            <input type="password" className="form-control" />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Repeat new password</label>
                                            <input type="password" className="form-control" />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Add other tabs similarly */}
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
