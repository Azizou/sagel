import PouchDB from 'pouchdb';
import { Injectable } from '@angular/core';

@Injectable()
export class PouchDbService {

  private localDatabase: any;

  constructor() {
    this.localDatabase = null;
  }

  public configureForUser(profile): void {

    // This will eventually take an Auth0 profile. Starting out we will give it a default name from the Home component.
    this.localDatabase = new PouchDB(this.getDatabaseName(profile), { adapter: 'websql' });

  }

  public getDB(): any {

    // Return the local database, if there is not one, return an error.
    if (!this.localDatabase) {

      throw (new Error("Database is not available - please configure an instance."));

    }

    return (this.localDatabase);

  }

  /** 
   * Not likely to use this unless we are doing a clean or uninstall 
  */
  public teardown(): void {

    // When we logout the user we need to close the database and set it to null.
    if (!this.localDatabase) {

      return;

    }

    // TODO: Stop remote replication for existing database (not needed for this demo).
    this.localDatabase.close();
    this.localDatabase = null;

  }

  /**
   * 
   * @param profile Sanitizer for local db name
   */
  private getDatabaseName(profile: any): string {
    let dbName = profile;

    return (dbName);

  }

}
