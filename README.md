# Easy queue collection
Internal system to manage and track collection requests.

## About

Easy queue colletion is service for managem a pickup lifecycle. It allows you to register and organize your collection requests and delivery in the right priority. The system can reduce the manual overhead and human errors by provides a simple and ease pickups queue.

### key feaures ✨
- Queue management
- Status tracking
- Priority calculation on register
- Operational resume from all pickups
- Queue filterin by status, region and client type

### Design Patterns and architecture 🏗
System follows the SOLID principles, its architecture is implemented with **Dependency injection** pattern with domain based separarion.
- The system logs and counts pickups by events os create and update, dispatched using the **Observer pattern**.
- The **Strategy pattern** is used to select the priority calculation based in `client_type` or `number_of_packages`.
- **Factory pattern** is implemented for priority calculation **Strategy** selecion and pickup creation.

## Instalation and requeriments
Clone the project by:

```
git clone https://github.com/efms25/easy-queue-collection.git
```

The Easy queue only requires Node.js 20+. Intall the packages with:
```
npm install
```

## Usage 🚀

The backand is build around REST api. Clients can interact using standard HTTP methods, sending requests to {your-host}/api.

| Name | Type | Description | Endpoint |
|------|------|-------------|----------|
| Create pickup | `POST` | Creates a new pickup | /pickup
| Update Status | `PATCH` | Changes the status of a pickup | /pickup/:id
| Delete pickup | `DELETE` | Remove a pickup by id | /pickup/:id
| Get all | `GET` | Return all registered pickups | /pickup
| Filter | `GET` | Return all pickups by query params `region`, `clientType` and/or `status` | /pickup/filter
| Operational Resume | `GET` | Returns the operational resume os the current state of the pickups | /pickup/resume




