import { Injectable } from '@angular/core';
import { PouchDB } from 'pouchdb';
/*
  Generated class for the PouchDbServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PouchDbServiceProvider {

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

  public teardown(): void {

    // When we logout the user we need to close the database and set it to null.
    if (!this.localDatabase) {

      return;

    }

    // TODO: Stop remote replication for existing database (not needed for this demo).
    this.localDatabase.close();
    this.localDatabase = null;

  }

  private getDatabaseName(profile: any): string {

    // Database naming restrictions from https://wiki.apache.org/couchdb/HTTP_database_API
    // --
    // A database must be named with all lowercase letters (a-z), digits (0-9), or
    // any of the _$()+-/ characters and must end with a slash in the URL. The name
    // has to start with a lowercase letter (a-z)... Uppercase characters are NOT
    // ALLOWED in database names.
    // let dbName = profile.email

    let dbName = profile;

    return (dbName);

  }

}
