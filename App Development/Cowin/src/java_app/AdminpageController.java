package java_app;

import java.net.URL;
import javafx.beans.property.StringProperty;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ResourceBundle;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.fxml.Initializable;
import javafx.scene.Parent;
import javafx.scene.control.Button;
import javafx.scene.layout.AnchorPane;
import javax.swing.JOptionPane;
import javafx.beans.property.SimpleStringProperty;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.scene.Scene;
import javafx.scene.control.Label;
import javafx.scene.control.TableColumn;
import javafx.scene.control.TableView;
import javafx.scene.control.cell.PropertyValueFactory;
import javafx.stage.Stage;

public class AdminpageController implements Initializable {

    @FXML
    private Button btn_registered;

    @FXML
    private Button btn_vaccinated;

    @FXML
    private AnchorPane registered_pane;

    @FXML
    private Label label_rcount;

    @FXML
    private Label label_vcount;

    @FXML
    private AnchorPane vaccinated_pane;

    @FXML
    private Button btn_logout;

    @FXML
    private TableView<UserDetails> Table_r;

    @FXML
    private TableColumn<UserDetails, String> column_emailr;

    @FXML
    private TableColumn<UserDetails, String> column_dose1r;

    @FXML
    private TableColumn<UserDetails, String> column_date1r;

    @FXML
    private TableColumn<UserDetails, String> column_vaccine1r;

    @FXML
    private TableColumn<UserDetails, String> column_dose2r;

    @FXML
    private TableColumn<UserDetails, String> column_date2r;

    @FXML
    private TableColumn<UserDetails, String> column_vaccine2r;

    @FXML
    private TableView<UserDetails> Table_v;

    @FXML
    private TableColumn<UserDetails, String> column_emailv;

    @FXML
    private TableColumn<UserDetails, String> column_dose1v;

    @FXML
    private TableColumn<UserDetails, String> column_date1v;

    @FXML
    private TableColumn<UserDetails, String> column_vaccine1v;

    @FXML
    private TableColumn<UserDetails, String> column_dose2v;

    @FXML
    private TableColumn<UserDetails, String> column_date2v;

    @FXML
    private TableColumn<UserDetails, String> column_vaccine2v;

    private ObservableList<UserDetails> data;

    Connection con = null;
    ResultSet rs = null;
    PreparedStatement ps = null;
    public String count;

    @Override
    public void initialize(URL url, ResourceBundle rb) {
    }

    @FXML
    private void Logout(ActionEvent event) throws Exception {
        try {
            JOptionPane.showMessageDialog(null, "Logout Successful");
            btn_logout.getScene().getWindow().hide();
            FXMLLoader loader = new FXMLLoader(getClass().getResource("FXML.fxml"));
            Parent root = loader.load();
            Stage mainstage = new Stage();
            Scene scene = new Scene(root);
            mainstage.setScene(scene);
            mainstage.show();
        } catch (Exception ex) {
            JOptionPane.showMessageDialog(null, ex);
        }
    }

    @FXML
    public void RegisteredPaneShow(ActionEvent event) {
        registered_pane.setVisible(true);
        vaccinated_pane.setVisible(false);
        con = mysqlconnect.Connectdb();
        boolean st = false;
        try {
            ps = con.prepareStatement("SELECT COUNT(*) FROM register;");
            rs = ps.executeQuery();
            st = rs.next();
            if (st) {
                count = rs.getString(1);
                label_rcount.setText("Registered count:" + count);
                data = FXCollections.observableArrayList();
                ps = con.prepareStatement("SELECT * FROM register");
                rs = ps.executeQuery();
                while (rs.next()) {
                    data.add(new UserDetails(rs.getString(1), rs.getString(2), rs.getString(3), rs.getString(4), rs.getString(5), rs.getString(6), rs.getString(7)));
                }
                Table_r.setEditable(true);
                column_emailr.setCellValueFactory(new PropertyValueFactory<>("email"));
                column_dose1r.setCellValueFactory(new PropertyValueFactory<>("dose1"));
                column_date1r.setCellValueFactory(new PropertyValueFactory<>("date1"));
                column_vaccine1r.setCellValueFactory(new PropertyValueFactory<>("vaccine1"));
                column_dose2r.setCellValueFactory(new PropertyValueFactory<>("dose2"));
                column_date2r.setCellValueFactory(new PropertyValueFactory<>("date2"));
                column_vaccine2r.setCellValueFactory(new PropertyValueFactory<>("vaccine2"));

                Table_r.setItems(data);

            } else {
                label_rcount.setText("Registered count: 0");
            }
        } catch (Exception e) {
            JOptionPane.showMessageDialog(null, e);
        }
    }

    @FXML
    void VaccinatedPaneShow(ActionEvent event) {
        vaccinated_pane.setVisible(true);
        registered_pane.setVisible(false);
        con = mysqlconnect.Connectdb();
        boolean st = false;
        try {
            ps = con.prepareStatement("SELECT COUNT(*) FROM vaccinated;");
            rs = ps.executeQuery();
            st = rs.next();
            if (st) {
                count = rs.getString(1);
                label_vcount.setText("Vaccinated count:" + count);
                data = FXCollections.observableArrayList();
                ps = con.prepareStatement("SELECT * FROM vaccinated");
                rs = ps.executeQuery();
                while (rs.next()) {
                    data.add(new UserDetails(rs.getString(1), rs.getString(2), rs.getString(3), rs.getString(4), rs.getString(5), rs.getString(6), rs.getString(7)));
                }
                Table_v.setEditable(true);
                column_emailv.setCellValueFactory(new PropertyValueFactory<>("email"));
                column_dose1v.setCellValueFactory(new PropertyValueFactory<>("dose1"));
                column_date1v.setCellValueFactory(new PropertyValueFactory<>("date1"));
                column_vaccine1v.setCellValueFactory(new PropertyValueFactory<>("vaccine1"));
                column_dose2v.setCellValueFactory(new PropertyValueFactory<>("dose2"));
                column_date2v.setCellValueFactory(new PropertyValueFactory<>("date2"));
                column_vaccine2v.setCellValueFactory(new PropertyValueFactory<>("vaccine2"));

                Table_v.setItems(data);

            } else {
                label_rcount.setText("Vaccinated count: 0");
            }
        } catch (Exception e) {
            JOptionPane.showMessageDialog(null, e);
        }
    }

    public class UserDetails {

        private final SimpleStringProperty email;
        private final SimpleStringProperty dose1;
        private final SimpleStringProperty date1;
        private final SimpleStringProperty vaccine1;
        private final SimpleStringProperty dose2;
        private final SimpleStringProperty date2;
        private final SimpleStringProperty vaccine2;

        //Default constructor
        public UserDetails(String email, String dose1, String date1, String vaccine1, String dose2, String date2, String vaccine2) {
            this.email = new SimpleStringProperty(email);
            this.dose1 = new SimpleStringProperty(dose1);
            this.date1 = new SimpleStringProperty(date1);
            this.vaccine1 = new SimpleStringProperty(vaccine1);
            this.dose2 = new SimpleStringProperty(dose2);
            this.date2 = new SimpleStringProperty(date2);
            this.vaccine2 = new SimpleStringProperty(vaccine2);
        }

        //getters
        public String getemailr() {
            return email.get();
        }

        public String getdose1() {
            return dose1.get();
        }

        public String getdate1() {
            return date1.get();
        }

        public String getvaccine1() {
            return vaccine1.get();
        }

        public String getdose2() {
            return dose2.get();
        }

        public String getdate2() {
            return date2.get();
        }

        public String getvaccine2() {
            return vaccine2.get();
        }

        //setters
        public void setemailr(String value) {
            email.set(value);
        }

        public void setdose1(String value) {
            dose1.set(value);
        }

        public void setdate1(String value) {
            date1.set(value);
        }

        public void setvaccine1(String value) {
            vaccine1.set(value);
        }

        public void setdose2(String value) {
            dose2.set(value);
        }

        public void setdate2(String value) {
            date2.set(value);
        }

        public void setvaccine2(String value) {
            vaccine2.set(value);
        }

        public StringProperty emailProperty() {
            return email;
        }

        public StringProperty dose1Property() {
            return dose1;
        }

        public StringProperty date1Property() {
            return date1;
        }

        public StringProperty dose2Property() {
            return dose2;
        }

        public StringProperty date2Property() {
            return date2;
        }

        public StringProperty vaccine1Property() {
            return vaccine1;
        }

        public StringProperty vaccine2Property() {
            return vaccine2;
        }
    }

}
