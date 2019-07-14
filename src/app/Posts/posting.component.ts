import {
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as Rx from 'rxjs';
import * as RxOp from 'rxjs/operators';

@Component({
  selector: 'app-posting',
  templateUrl: './posting.component.html',
  styleUrls: [ './posting.component.scss' ],
})
export class PostingComponent implements OnInit, OnDestroy {
  private readonly subs: Rx.Subscription[] = [];

  private postingId: string;

  public constructor(
    private readonly activatedRoute: ActivatedRoute,
  ) {}

  public ngOnInit(): void {
    this.subs
      .push(
        this.activatedRoute.paramMap
          .pipe(
            RxOp.map(paramMap => paramMap.get('id')),
          )
          .subscribe(id => this.postingId = id),
      );
  }

  public ngOnDestroy(): void {
    this.subs
      .forEach(sub => sub.unsubscribe());
  }
}
