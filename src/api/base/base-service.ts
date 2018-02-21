import { Model } from "../../models/model";

export abstract class BaseService {
  model: Model
  constructor(model: Model) {
    this.model = model
  }
}
