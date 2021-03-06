import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pawn } from '../../models/pawn.model';
import { GenericService } from '../../services/generic.service';
import { PageVar } from '../../models/pages.model';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { PrintParams } from '../../models/print.model';

@Injectable()
export class PawnService extends GenericService {

  constructor(http: HttpClient) {
    super(http);
  }

  public printPawns(printParams: PrintParams): Observable<any> {
    return this.get('pawns/print', printParams);
  }

  public searchPawn(terms: Observable<string>) {
    return terms.debounceTime(400)
      .distinctUntilChanged()
      .switchMap(term => this.search(term));
  }

  private search(searchTerm: string): Observable<any> {
    return this.get('pawn/search', {term: searchTerm});
  }

  public getPawns(pageVar: PageVar): Observable<any> {
    return this.paginate('pawn/list', pageVar);
  }

  public savePawn(pawn: Pawn): Observable<any> {
    return this.post('pawn/new', pawn);
  }

  public updatePawn(id: string, pawn: Pawn): Observable<any> {
    return this.update(`pawn/update/${id}`, pawn);
  }

  public editPawn(id: number): Observable<any> {
    return this.edit('pawn/edit', id.toString());
  }

  public deletePawn(id: number): Observable<any> {
    return this.delete(`pawn/delete/${id.toString()}`);
  }
}