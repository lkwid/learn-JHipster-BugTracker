import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ITicket, NewTicket } from '../ticket.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ITicket for edit and NewTicketFormGroupInput for create.
 */
type TicketFormGroupInput = ITicket | PartialWithRequiredKeyOf<NewTicket>;

type TicketFormDefaults = Pick<NewTicket, 'id' | 'done' | 'labels'>;

type TicketFormGroupContent = {
  id: FormControl<ITicket['id'] | NewTicket['id']>;
  title: FormControl<ITicket['title']>;
  description: FormControl<ITicket['description']>;
  dueDate: FormControl<ITicket['dueDate']>;
  done: FormControl<ITicket['done']>;
  project: FormControl<ITicket['project']>;
  assignedTo: FormControl<ITicket['assignedTo']>;
  labels: FormControl<ITicket['labels']>;
};

export type TicketFormGroup = FormGroup<TicketFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class TicketFormService {
  createTicketFormGroup(ticket: TicketFormGroupInput = { id: null }): TicketFormGroup {
    const ticketRawValue = {
      ...this.getFormDefaults(),
      ...ticket,
    };
    return new FormGroup<TicketFormGroupContent>({
      id: new FormControl(
        { value: ticketRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      title: new FormControl(ticketRawValue.title, {
        validators: [Validators.required],
      }),
      description: new FormControl(ticketRawValue.description),
      dueDate: new FormControl(ticketRawValue.dueDate),
      done: new FormControl(ticketRawValue.done),
      project: new FormControl(ticketRawValue.project),
      assignedTo: new FormControl(ticketRawValue.assignedTo),
      labels: new FormControl(ticketRawValue.labels ?? []),
    });
  }

  getTicket(form: TicketFormGroup): ITicket | NewTicket {
    return form.getRawValue() as ITicket | NewTicket;
  }

  resetForm(form: TicketFormGroup, ticket: TicketFormGroupInput): void {
    const ticketRawValue = { ...this.getFormDefaults(), ...ticket };
    form.reset(
      {
        ...ticketRawValue,
        id: { value: ticketRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): TicketFormDefaults {
    return {
      id: null,
      done: false,
      labels: [],
    };
  }
}
